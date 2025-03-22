insert into contact(email, first_name, last_name, phone, `subject`, message, resolved, created_at)
values
('baodqhe180053@fpt.edu.vn', 'BaoT3', 'Doan Quoc', '2345678901', 'Want to become a teacher', 'I want to become a teacher!!!', 0, now());

insert into `account`(email, first_name, last_name, `password`, `role`, `status`, created_at)
values
('learnhub391@gmail.com', 'Bao', 'Doan Quoc', '$2a$10$NdlRe2ubz18WLfBoxopw1.051vq9Ek2jkGQJ00WjBL2hQv3R3BPDa', 'ADMIN',  'ACTIVE', now()), -- ABC@123
('doanquocbaooooooo@gmail.com', 'BaoS', 'Doan Quoc', '$2a$10$BHIFmEpxSFaUGlcsCp5F5usmJirNKINm6eRkhy/rr8YgcO4QcED/m', 'STUDENT',  'ACTIVE', now()), -- ABC@456
('doanbao2506@gmail.com', 'BaoT1', 'Doan Quoc', '$2a$10$WG7RjXtZRyBjj6388I8fROrCr5AFWp2wnUXUFLrDYoazEDxZ4kWlC', 'TEACHER',  'ACTIVE', now()), -- ABC@789
('doanqbao2506@gmail.com', 'BaoT2', 'Doan Quoc', '$2a$10$m7C2R4n7BAxTGlZ1obEM0uH2iCBn.KwpE8s8GEY9QTeKZ62e1eibm', 'TEACHER',  'ACTIVE', now()), -- ABC@012
('minhcuong2922004@gmail.com', 'CuongCM', 'Minh Cuong', '$2a$10$m7C2R4n7BAxTGlZ1obEM0uH2iCBn.KwpE8s8GEY9QTeKZ62e1eibm', 'COURSE_MANAGER',  'ACTIVE', now());
insert into student_profile(account_id, school, `type`)
values
(2, 'FPT University', 'GRADE11');

insert into teacher_profile(account_id, major, phone, website, work_address, city, biography)
values
(3, 'Math 12', '0382633428', 'https://youtube.com', 'FPT University', 'Hanoi', 'A normal math teacher'),
(4, 'Literature 11', '0123456789', 'https://google.com', 'ABC School', 'Ho Chi Minh city', null);

insert into category(`name`)
values ('Calculus'), ('Algebra'), ('Vietnam\'s Literature'), ('Foreign Literature');

insert into course(teacher_id, category_id, `name`, price, `status`, `description`, `image`, created_at)
values
(3, 1, 'Basic Calculus', 200.0, 'PUBLIC', 'Basic calculus for beginners.', null, now()),
(3, 2, 'Algebra', 0.0, 'PUBLIC', 'Basic algebra.', 'uploads/5b3a927b-68e2-49b4-8e49-9d87d6a16295.png', now()),
(3, 1, 'Advanced Calculus', 530.0, 'PUBLIC', 'Advanced calculus for good students.', null, now()),
(3, 2, 'Advanced Algebra', 400.0, 'PUBLIC', 'Advanced algebra.', null, now()),
(4, 3, 'How to write an essay for Chi Pheo', 120.0, 'PUBLIC', 'Step by step guide to write an essay with Chi Pheo.', null, now()),
(4, 3, 'Rhetorical questions', 30.0, 'PUBLIC', 'Explain what is rhetorical questions and how to use it.', null, now()),
(4, 4, 'Introduction to Andersen', 90.0, 'PUBLIC', 'Introduction to some of the piece of Andersen.', null, now()),
(4, 4, 'Vietnam\'s Literature vs Foreign Literature', 100.0, 'PUBLIC', 'Compare literature in vietnam to that in other countries.', null, now());

insert into course_chapter(course_id, `title`)
values
(2, 'Introduction to basic arithmetic'),
(2, 'Practice arithmetic'),
(2, 'Further knowledge');

insert into chapter_material(chapter_id, `name`, `type`, `description`)
values
(1, 'How to do addition', 'LESSON', 'This lesson teach you how to do addition between difference type of number.'),
(1, 'Small test for addition', 'QUIZ', 'Pass this test or else'),
(1, 'Lesson 3', 'LESSON', 'Description of lesson 3');

insert into lesson(material_id, video_url)
values
(1, 'uploads/49452847-d931-4f14-b985-01c1e9037df5.mp4'),
(3, 'uploads/4d6564c9-affa-40d7-bf2e-2dc6b58386e0.mp4');

insert into lesson_material(lesson_id, `name`, file_url)
values
(1, 'Material 1', 'uploads/966f0c6e-1658-4858-9b33-6a2a76b135d4.pdf'),
(3, 'Material 1', 'uploads/84dc5393-4e41-4bea-a46a-835a0bf4e522.pdf');

insert into quiz(material_id, pass_grade)
values
(2, 1);

insert into quiz_question(quiz_id, `text`, explanation)
values
(2, '1 + 1 = ?', 'Are you dumb enough to get this wrong?'),
(2, '1234567890 + 9876543210 = ?', 'Confusing question isn\'t it?');

insert into question_option(question_id, `text`, `correct`)
values
(1, '1', 0),
(1, '2', 1),
(1, 'Hello World', 0),
(1, '10 (binary)', 1),
(2, '10000000000', 0),
(2, '11111111100', 1),
(2, 'You are not dumb', 0),
(2, 'This question is dumb', 0);

insert into course_purchase(course_id, student_id, purchase_price, purchased_at)
values (2, 2, 0, now());

insert into enrollment(course_id, student_id, `status`, enrolled_at)
values (2, 2, 'IN_PROGRESS', now());
