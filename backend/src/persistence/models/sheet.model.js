import mongoose from 'mongoose';

const sheetsSchema = new mongoose.Schema({
  excel: {
    type: Array,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  collaborator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
});

export const sheetModel = mongoose.model('Sheets', sheetsSchema);
