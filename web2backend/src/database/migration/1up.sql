-- Add feedback to survey --

ALTER TABLE surveys
ADD feedback boolean default 'f', ADD program_id int default null; 

ALTER TABLE programs
ADD feedback_survey_id int default null;

ALTER TABLE programs ADD CONSTRAINT programs_feedback_survey_id_fkey
FOREIGN KEY (feedback_survey_id) REFERENCES surveys(id);

ALTER TABLE surveys ADD CONSTRAINT surveys_program_id_fkey
FOREIGN KEY (program_id) REFERENCES programs(id);