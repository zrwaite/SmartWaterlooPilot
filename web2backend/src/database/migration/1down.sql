ALTER TABLE surveys
DROP COLUMN feedback; 

ALTER TABLE programs DROP CONSTRAINT programs_feedback_survey_id_fkey;

ALTER TABLE programs
DROP COLUMN feedback_survey_id;