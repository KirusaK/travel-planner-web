//                                                     //
///// Здесь все запросы которые связанные с отелями /////
//                                                     //

import {Router} from 'express';
import {pool} from '../db/db.js'

const router = Router();

const HOTEL_COLUMNS = `
  h.id,
  h.name,
  h.logo_url as "logoUrl",
  h.address,
  h.google_maps_url as "googleMapsUrl",
  h.map_embed_url as "mapEmbedUrl",
  h.description,
  h.features,
  h.price_per_night::float as "pricePerNight",
  h.rating::float as rating,
  h.reviews_count as "reviewsCount"
`;

async function insertRooms (client, hotelId, rooms) {
    for (let i = 0; i < rooms.length; i++) {
        const room = rooms[i];

        await client.query(`
      insert into hotel_rooms (
        hotel_id, sort_order, title, price, image_url
      ) values ($1, $2, $3, $4, $5)`,
            [
                hotelId,
                i,
                room.title.trim(),
                Number(room.price),
                room.imageUrl || null,
            ],
        );
    }
}

async function insertAmenities (client, hotelId, amenitiesIds) {
    if (!Array.isArray(amenitiesIds) || amenitiesIds.length === 0) return;

    await client.query(`
    insert into hotel_amenities (hotel_id, amenity_id)
    select $1, unnest($2::int[])
    on conflict do nothing`,
        [hotelId, amenitiesIds]
    )
}

function validateHotel ({name, address, googleMapsUrl, mapEmbedUrl, description, pricePerNight, rooms}) {
    if (
        !name?.trim() ||
        !address?.trim() ||
        !googleMapsUrl?.trim() ||
        !mapEmbedUrl?.trim() ||
        !description?.trim()
    )
        return "Not all fields have been filled in ";

    if (!(Number(pricePerNight) > 0)) return "Price per night must be greater than 0";
    if (!Array.isArray(rooms) || rooms.length === 0) return "At least one room is required";
    if (rooms.some((r) => !r.title?.trim() || !(Number(r.price) > 0))) return "Each room needs a title and a price > 0";

    return null;
}

router.get("/", async (req, res) => {
    try {
        const { rows } = await pool.query(`
      select ${HOTEL_COLUMNS},
        (select count(*) from hotel_rooms r 
            where r.hotel_id = h.id)::int as "roomsCount",
        (select count(*) from hotel_amenities a
            where a.hotel_id = h.id)::int as "amenitiesCount",
        (select image_url from hotel_rooms r
            where r.hotel_id = h.id
            order by r.sort_order LIMIT 1) as cover
      from hotels h
      order by h.id
    `);

        res.json(rows);
    } catch (err) {
        console.error("Error fetching  hotels:", err);
        res.status(500).json({error: "Server error"});
    }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }

    try {
        const hotel = await pool.query(`
      select ${HOTEL_COLUMNS} from hotels h where h.id = $1`,
            [id],
        );

        if (hotel.rows.length === 0) {
            return res.status(404).json({ error: "Hotel not found" });
        }

        const rooms = await pool.query(`
      select id, 
             title, 
             price::float as price, 
             image_url as "imageUrl"
      from hotel_rooms r
      where r.hotel_id = $1
      order by sort_order`,
            [id],
        )

        const amenities = await pool.query(
            `
      select a.id,
             a.name,
             a.icon
      from hotel_amenities ha
      join amenities a on a.id = ha.amenity_id
      where ha.hotel_id = $1
      ORDER BY a.id`,
            [id],
        );

        const reviews = await pool.query(`
      select id,
             author_name as "authorName",
             avatar_url as "avatarUrl" ,
             rating::float as rating,
             text
      from hotel_reviews 
      where hotel_id = $1
      ORDER BY created_at DESC, id DESC`,
            [id],
        );

        res.json({
            ...hotel.rows[0],
            rooms: rooms.rows,
            amenities: amenities.rows,
            reviews: reviews.rows,
        });
    } catch (err) {
        console.error("Error fetching  hotels:", err);
        res.status(500).json({error: "Server error"});
    }
})

router.post("/", async (req, res) => {
    const {
        name,
        logoUrl,
        address,
        googleMapsUrl,
        mapEmbedUrl,
        description,
        features,
        pricePerNight,
        rooms,
        amenitiesIds,
    } = req.body;

    const price = Number(pricePerNight);

    const validationError = validateHotel(req.body);
    if (validationError) return res.status(400).json({error: validationError});

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const hotelResult = await client.query(`
      insert into hotels (
                          name,
                          logo_url,
                          address,
                          google_maps_url,
                          map_embed_url,
                          description,
                          features,
                          price_per_night         
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8)
      returning id`,
            [
                name.trim(),
                logoUrl || null,
                address.trim(),
                googleMapsUrl || null,
                mapEmbedUrl || null,
                description,
                Array.isArray(features) ? features : [],
                price,
            ]
        );

        const newHotelId = hotelResult.rows[0].id;
        await insertRooms(client, newHotelId, rooms);
        await insertAmenities(client, newHotelId, amenitiesIds);

        await client.query('COMMIT');
        res.status(201).json({ message: "Hotel created successfully", hotelId: newHotelId });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error("Error adding  hotels:", err);
        res.status(500).json({error: "Server error"});
    } finally {
        client.release();
    }
})

router.put("/:id", async (req, res) => {
    const {id} = req.params;

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }

    const {
        name,
        logoUrl,
        address,
        googleMapsUrl,
        mapEmbedUrl,
        description,
        features,
        pricePerNight,
        rooms,
        amenitiesIds,
    } = req.body;

    const validationError = validateHotel(req.body);
    if (validationError) return res.status(400).json({error: validationError});

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const result = await client.query(`
      update hotels 
        set name = $1, logo_url = $2, address = $3, google_maps_url = $4,
            map_embed_url = $5, description = $6, features = $7, price_per_night = $8
            where id = $9`,
            [
                name.trim(),
                logoUrl || null,
                address.trim(),
                googleMapsUrl || null,
                mapEmbedUrl || null,
                description,
                Array.isArray(features) ? features : [],
                Number(pricePerNight),
                id,
            ],
        );

        if (result.rowCount === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({error: "Hotel not found"});
        }

        await client.query(`delete from hotel_rooms where hotel_id  = $1`, [id])
        await client.query(`delete from hotel_amenities where hotel_id  = $1`, [id])
        await insertRooms(client, id, rooms);
        await insertAmenities(client, id, amenitiesIds);

        await client.query('COMMIT');
        res.json({message: "Hotel updated successfully", hotelId: Number(id)})
    } catch (err) {
        await client.query('ROLLBACK');
        console.error("Error updating  hotels:", err.message);
        res.status(500).json({error: "Server error"});
    } finally {
        client.release();
    }
})

router.delete("/:id", async (req, res) => {
    const {id} = req.params;

    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: "Invalid hotel id" });
    }

    try {
        const result = await pool.query(`
      delete from hotels where id = $1 returning id 
    `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({error: "Hotel not found"});
        }

        res.json({message: "Hotel deleted successfully", id: result.rows[0].id});
    } catch (err) {
        console.error("Error deleting hotels:", err);
        res.status(500).json({error: "Server error"});
    }
})

export default router;