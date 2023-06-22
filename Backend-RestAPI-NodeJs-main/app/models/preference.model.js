const mongoose = require('mongoose');

const PreferenceSchema = mongoose.Schema(
    {
        region: String,
    date: String,
    periode: String,
    budget: String,
    compagnie: String,
    type_de_restaurant: String,
    type_de_residence: String,
    temps_preferes: String,
    activitees: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Preference', PreferenceSchema);
