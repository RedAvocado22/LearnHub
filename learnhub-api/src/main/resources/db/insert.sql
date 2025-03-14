insert into contact(email, first_name, last_name, phone, `subject`, message, resolved, created_at)
values
('baodqhe180053@fpt.edu.vn', 'BaoT3', 'Doan Quoc', '2345678901', 'Want to become a teacher', 'I want to become a teacher!!!', 0, now());

insert into `account`(email, first_name, last_name, `password`, `role`, `status`, created_at)
values
('learnhub391@gmail.com', 'Bao', 'Doan Quoc', '$2a$10$NdlRe2ubz18WLfBoxopw1.051vq9Ek2jkGQJ00WjBL2hQv3R3BPDa', 'ADMIN',  'ACTIVE', now()), -- ABC@123
('doanquocbaooooooo@gmail.com', 'BaoS', 'Doan Quoc', '$2a$10$BHIFmEpxSFaUGlcsCp5F5usmJirNKINm6eRkhy/rr8YgcO4QcED/m', 'STUDENT',  'ACTIVE', now()), -- ABC@456
('doanbao2506@gmail.com', 'BaoT1', 'Doan Quoc', '$2a$10$WG7RjXtZRyBjj6388I8fROrCr5AFWp2wnUXUFLrDYoazEDxZ4kWlC', 'TEACHER',  'ACTIVE', now()), -- ABC@789
('doanqbao2506@gmail.com', 'BaoT2', 'Doan Quoc', '$2a$10$m7C2R4n7BAxTGlZ1obEM0uH2iCBn.KwpE8s8GEY9QTeKZ62e1eibm', 'TEACHER',  'ACTIVE', now()); -- ABC@012

insert into student_profile(account_id, school, `type`)
values
(2, 'FPT University', 'GRADE11');

insert into teacher_profile(account_id, major, phone, website, work_address, city, biography)
values
(3, 'Math 12', '0382633428', 'https://youtube.com', 'FPT University', 'Hanoi', 'A normal math teacher'),
(4, 'Literature 11', '0123456789', 'https://google.com', 'ABC School', 'Ho Chi Minh city', null);

insert into category(`name`)
values ('Calculus'), ('Algebra'), ('Vietnam\'s Literature'), ('Foreign Literature');

insert into course(teacher_id, category_id, `name`, price, `status`, `description`, created_at)
values
(3, 1, 'Basic Calculus', 200.0, 'PUBLIC', 'Basic calculus for beginners.', now()),
(3, 2, 'Algebra', 0.0, 'PUBLIC', 'Basic algebra.', now()),
(3, 1, 'Advanced Calculus', 530.0, 'PUBLIC', 'Advanced calculus for good students.', now()),
(3, 2, 'Advanced Algebra', 400.0, 'PUBLIC', 'Advanced algebra.', now()),
(4, 3, 'How to write an essay for Chi Pheo', 120.0, 'PUBLIC', 'Step by step guide to write an essay with Chi Pheo.', now()),
(4, 3, 'Rhetorical questions', 30.0, 'PUBLIC', 'Explain what is rhetorical questions and how to use it.', now()),
(4, 4, 'Introduction to Andersen', 90.0, 'PUBLIC', 'Introduction to some of the piece of Andersen.', now()),
(4, 4, 'Vietnam\'s Literature vs Foreign Literature', 100.0, 'PUBLIC', 'Compare literature in vietnam to that in other countries.', now());
