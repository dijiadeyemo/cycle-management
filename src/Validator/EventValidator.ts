import { query } from "express-validator/check";

const EventValidator = [
    query("user_id")
        .not().isEmpty(),
    query("symptom")
        .not().isEmpty(),
    query("timestamp")
        .not().isEmpty(),
];

export default EventValidator;