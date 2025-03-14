create database learnhub;
use learnhub;

create table if not exists `account` (
	id int primary key auto_increment,
    first_name nvarchar(255),
    last_name nvarchar(255),
    email varchar(255) unique not null,
    `password` text not null, -- hash
    role varchar(255) not null,
    check (role in ('admin', 'teacher_manager', 'course_manager', 'teacher', 'student')),
    `active` boolean not null default false,
    created_at datetime not null default now()
);

create table if not exists student_profile (
	id int primary key,
    education_level int, -- cái này nên để dropdown xong cho student chọn
    school nvarchar(255),
    foreign key (id) references `account`(id)
);

create table if not exists teacher_profile (
	id int primary key,
    major nvarchar(255) not null,
    details text not null, -- markdown
    foreign key (id) references `account`(id)
);

create table if not exists employee_profile (
	id int primary key,
    position nvarchar(255),
    foreign key (id) references `account`(id)
);

-- 1. Home page -> Contact us -> điền form (email, phone,...) -> teacher manager thấy request
-- 2. teacher manager gửi mail kêu reply gửi cv đi -> teacher gửi cv qua mail
-- 3. teacher manager oke -> status sang accept -> tạo account vs role teacher và email -> gửi mail có mật khẩu tạm thời
-- 4. teacher manager ko oke -> status sang decline -> gửi mail kèm lí do
create table if not exists teacher_registration (
	id int primary key auto_increment,
    email varchar(255) unique not null,
    phone varchar(255) not null,
    reason text,
    teacher_manager_id int,
    -- t định ko cho password vào đây, để khi nào mình accept request rồi mới cho teacher vào tạo password
    -- như thế t nghĩ nó bảo mật hơn, để teacher manager ko biết password của người ta là gì ấy
    -- sau khi mình accept mình có thể cho teacher mật khẩu tạm thời (gửi qua email) để teacher đăng nhập bình thường, xong đăng nhập xong thì bảo người ta đổi mật khẩu
    `status` varchar(255) not null default 'pending',
    check (`status` in ('accept', 'decline', 'pending')),
    response nvarchar(255), -- cái này gửi qua mail của teacher
    requested_at datetime not null default now(),
    responsed_at datetime,
    foreign key (teacher_manager_id) references `account`(id)
);

-- course manager tạo và quản lí categories
create table if not exists category (
	id int primary key auto_increment,
    `name` nvarchar(255) unique not null
);

create table if not exists course (
	id int primary key auto_increment,
    `name` nvarchar(255) not null,
    price double not null,
	-- các cái nội dung chữ như description của course hay bài giảng t nghĩ nên để dạng markdown (hoặc html) cho dễ format
	-- xong mình lưu nguyên cả code markdown đấy vào đây, khi nào lấy ra thì parse.
    `description` text, -- markdown
    
    -- 1. teacher tạo course thì ban đầu là private(student chưa nhìn thấy, chưa submit cho course manager)
    -- 2. teacher tạo xong course rồi thì submit cho course manager, thì status chuyển sang pending
    -- 3. course manager thấy oke, thì chuyển status sang public (student nhìn thấy course và có thể purchase)
    -- 4. nếu course manager thấy course có vấn đề (lúc đấy course có thể đang pending hoặc public), thì chuyển status sang cancelled -> hoàn tiền có điều kiện + ko cho student học course nx? / ko hoàn tiền + student vx học course đấy.
    -- 5. teacher muốn thay đổi nội dung course thì chuyển status về private và lại phải submit cho course manager(bước 3)
	-- 6. teacher xóa course thì chuyển status sang archived (mình ko cho xóa hẳn bời vì có thể có student đã mua course đấy rồi)
    -- teacher có thể crud những course public, private, cancelled(chỉ read thôi, ko cud) của mình, teacher ko truy cập được những course archived
    -- student có thể mua những course public, nếu đã mua rồi thì student có thể truy cập course đấy ở tất cả status (trừ cancelled)
    -- course manager có thể nhìn thấy những course public, pending, cancelled (trừ private). Có thể cho nó quản lí cả course archived nữa? (cái này t đang phân vân) 
    `status` varchar(255) not null default 'private',
    check (`status` in ('public', 'private', 'pending', 'cancelled', 'archived')),
    created_at datetime not null default now(),
    updated_at datetime,
    cancelled_at datetime,
    archived_at datetime
);

-- ("course 1", "Văn"), ("course 1", "Lớp 12"),
create table if not exists course_category (
	course_id int not null,
    category_id int not null,
    primary key (course_id, category_id),
    foreign key (course_id) references course(id),
    foreign key (category_id) references category(id)
);

create table if not exists course_chapter (
	id int primary key auto_increment,
    course_id int not null,
    `name` nvarchar(255) not null,
    sequence_num int not null, -- cái này chạy từ 1...
    `description` text,
    foreign key (course_id) references course(id)
);

create table if not exists chapter_material (
	id int primary key auto_increment,
    chapter_id int not null,
    `type` varchar(255) not null,
    check (`type` in ('article', 'video', 'quiz')),
    title nvarchar(255) not null,
    sequence_number int not null,
    foreign key (chapter_id) references course_chapter(id)
);

create table if not exists article (
	material_id int primary key,
    content text not null, -- cái này cũng để markdown (hoặc html) [](/course_id/image/image_id.jpg)
    foreign key (material_id) references chapter_material(id)
);

create table if not exists video (
	material_id int primary key,
    video_file text not null, -- "/course_id/video/material_id.mp4"
    foreign key (material_id) references chapter_material(id)
);

create table if not exists quiz (
	material_id int primary key,
    description text,
    pass_grade double not null default 0.0,
    `time` int not null, -- đơn vị: phút
    foreign key (material_id) references chapter_material(id)
);

create table if not exists quiz_question (
	id int primary key auto_increment,
    quiz_id int not null,
	`text` text not null,
    explanation text,
    foreign key (quiz_id) references quiz(material_id)
);

create table if not exists question_option (
	id int primary key auto_increment,
    question_id int not null,
    `text` text not null,
    correct boolean not null,
    foreign key (question_id) references quiz_question(id)
);

create table if not exists course_purchase (
	id int primary key auto_increment,
    course_id int not null,
    student_id int not null,
    purchase_price double not null,
    purchased_at datetime not null default now(),
    foreign key (course_id) references course(id),
    foreign key (student_id) references `account`(id)
);

create table if not exists enrollment (
	id int primary key auto_increment,
    student_id int not null,
    course_id int not null,
    `status` varchar(255) not null default 'in_progress',
    check (`status` in ('in_progress', 'finished')),
    enrolled_at datetime not null default now(),
    finished_at datetime,
    unique (student_id, course_id), -- ko cho enroll nhiều lần
    foreign key (student_id) references `account`(id),
    foreign key (course_id) references course(id)
);

create table if not exists student_progress (
	enrollment_id int not null,
    material_id int not null,
    -- material type là article: ở dưới cùng article có nút 'Mark as completed', ấn vào thì chuyển sang finished
    -- material type là video: xem hết video thì chuyển sang finished
    -- material type là quiz: student_quiz_attempt có ít nhất 1 cái passed thì chuyển sang finished
    `status` varchar(255) not null default 'in_progress',
    check (`status` in ('in_progress', 'finished')),
    finished_at datetime,
    primary key (enrollment_id, material_id),
    foreign key (enrollment_id) references enrollment(id),
    foreign key (material_id) references chapter_material(id)
);

create table if not exists student_quiz_attempt (
	id int primary key auto_increment,
    enrollment_id int not null,
    quiz_id int not null,
    answer text, -- cái này là json
    grade double,
    started_at datetime not null default now(),
    submitted_at datetime,
    foreign key (enrollment_id) references enrollment(id),
    foreign key (quiz_id) references quiz(material_id)
);
-- answer.json
-- {
-- 	"quiz_id": 1,
--     "questions": [
-- 		{
-- 			"question_id": 1,
--          "answers": [
-- 				{
-- 					"option_id": 1,
-- 					"chosen": true
--              },
--              {
-- 					"option_id": 2,
-- 					"chosen": false
--              },
--              {
-- 					"option_id": 3,
-- 					"chosen": true
--              },
--              {
-- 					"option_id": 4,
-- 					"chosen": false
--              }
--          ]
--      }
--  ]
-- }

create table if not exists student_course_feedback (
	id int primary key auto_increment,
    student_id int not null,
    course_id int not null,
    content text not null,
    sent_at datetime not null default now(),
    foreign key (student_id) references `account`(id),
    foreign key (course_id) references course(id)
);

create table if not exists course_discussion (
	id int primary key auto_increment,
    student_id int not null,
    course_id int not null,
    title nvarchar(255) not null,
    content text not null,
    `status` varchar(255) not null default 'opened',
    check (`status` in ('opened', 'closed')),
    created_at datetime not null default now(),
    closed_at datetime,
    foreign key (student_id) references `account`(id),
    foreign key (course_id) references course(id)
);

create table if not exists discussion_comment (
	id int primary key auto_increment,
    user_id int not null,
    discussion_id int not null,
    content text not null,
    approved boolean not null default false,
    created_at datetime not null default now(),
    foreign key (user_id) references `account`(id),
    foreign key (discussion_id) references course_discussion(id)
);
