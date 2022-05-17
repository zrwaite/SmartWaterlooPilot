-- Add feedback to survey --

ALTER TABLE surveys
ADD feedback boolean default 'f'; 

ALTER TABLE programs
ADD feedback_survey_id int default null;

ALTER TABLE programs ADD CONSTRAINT programs_feedback_survey_id_fkey
FOREIGN KEY (feedback_survey_id) REFERENCES surveys(id);