import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (projectname: string, description: string, storyPoint: string, startDate: string, endDate: string, status: string) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ open, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [storyPoint, setStoryPoint] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = () => {
    if (title && description && storyPoint && startDate && endDate && status) {
      onSave(title, description, storyPoint, startDate, endDate, status);
      setTitle('');
      setDescription('');
      setStoryPoint('');
      setStartDate('');
      setEndDate('');
      setStatus('');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          p: 4,
          boxShadow: 24,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Add New Task
        </Typography>

        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Story Point"
          value={storyPoint}
          onChange={(e) => setStoryPoint(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />

        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as string)}
            label="Status"
          >
            <MenuItem value="TODO">TODO</MenuItem>
            <MenuItem value="INPROGRESS">IN PROGRESS</MenuItem>
            <MenuItem value="INREVIEW">IN REVIEW</MenuItem>
            <MenuItem value="COMPLETED">COMPLETED</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddTaskModal;
