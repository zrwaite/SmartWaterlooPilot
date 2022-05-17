ALTER TABLE programs DROP CONSTRAINT programs_feedback_survey_id_fkey;
ALTER TABLE surveys DROP CONSTRAINT surveys_program_id_fkey;


ALTER TABLE surveys
DROP COLUMN feedback, DROP column program_id; 


ALTER TABLE programs
DROP COLUMN feedback_survey_id;