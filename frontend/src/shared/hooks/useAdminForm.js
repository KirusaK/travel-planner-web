import {useState} from "react";

export const useAdminForm = ({initialData, submit, onCreated, onClose}) => {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError("");

    try {
      await submit(formData);
      await onCreated?.();
      setFormData(initialData);
      setActiveTab("general");
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleClose = () => {
    setError("");
    onClose();
  };

  return {formData, setFormData, activeTab, setActiveTab, isSubmitting, error, handleChange, handleSubmit, handleClose};
}