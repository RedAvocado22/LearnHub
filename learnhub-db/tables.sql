create table if not exists account (
	id int primary key auto_increment,
    first_name nvarchar(255),
    last_name nvarchar(255),
    email varchar(255) unique not null,
    `password` text not null, -- hash
    role varchar(255) not null check(
		role in ('admin', 'teacher_manager', 'course_manager', 'teacher', 'student')
	)
);

create table if not exists student_profile (
	id int primary key,
    grade int,
    school nvarchar(255),
    foreign key (id) references account(id)
);

create table if not exists teacher_profile (
	id int primary key,
    major nvarchar(255) not null,
    description text not null, -- markdown
    foreign key (id) references account(id)
);

create table if not exists employee_profile (
	id int primary key,
    position nvarchar(255),
    foreign key (id) references account(id)
);

-- 1. Home page -> Contact us -> điền form (email, attachment,...) -> teacher manager thấy request
-- 2. teacher manager gửi mail kêu reply gửi cv đi -> teacher gửi cv qua mail
-- 3. teacher manager oke -> status sang accept -> tạo account vs role teacher và email -> gửi mail có mật khẩu tạm thời
-- 4. teacher manager ko oke -> status sang decline -> gửi mail kèm lí do
create table if not exists teacher_registration (
	id int primary key auto_increment,
    email varchar(255) unique not null,
    phone varchar(255) not null,
    reason text,
    -- t định ko cho password vào đây, để khi nào mình accept request rồi mới cho teacher vào tạo password
    -- như thế t nghĩ nó bảo mật hơn, để teacher manager ko biết password của người ta là gì ấy
    -- sau khi mình accept mình có thể cho teacher mật khẩu tạm thời (gửi qua email) để teacher đăng nhập bình thường, xong đăng nhập xong thì bảo người ta đổi mật khẩu
    `status` varchar(255) not null check(status in ('accept', 'decline', 'pending')) default('pending'),
    response nvarchar(255) -- cái này gửi qua mail của teacher
);

create table if not exists tag (
	id int primary key auto_increment,
    `name` nvarchar(255) unique not null
);

-- ("course 1", "Văn"), ("course 1", "Lớp 12"),
create table if not exists course_tag (
	course_id int,
    tag_id int,
    primary key(course_id, tag_id)
);

create table if not exists course (
	id int primary key auto_increment,
    `name` nvarchar(255) not null,
    price double not null,
	-- các cái nội dung chữ như description của course hay bài giảng t nghĩ nên để dạng markdown (hoặc html) cho dễ format
	-- xong mình lưu nguyên cả code markdown đấy vào đây, khi nào lấy ra thì parse.
    description text, -- markdown
    
    -- 1. teacher tạo course thì ban đầu là private(student chưa nhìn thấy, chưa submit cho course manager)
    -- 2. teacher tạo xong course rồi thì submit cho course manager, thì status chuyển sang pending
    -- 3. course manager thấy oke, thì chuyển status sang public (student nhìn thấy course và có thể purchase)
    -- 4. nếu course manager thấy course có vấn đề (lúc đấy course có thể đang pending hoặc public), thì chuyển status sang cancelled -> hoàn tiền có điều kiện + ko cho student học course nx? / ko hoàn tiền + student vx học course đấy.
    -- 5. teacher muốn thay đổi nội dung course thì chuyển status về private và lại phải submit cho course manager(bước 3)
	-- 6. teacher xóa course thì chuyển status sang archived (mình ko cho xóa hẳn bời vì có thể có student đã mua course đấy rồi)
    -- teacher có thể crud những course public, private, cancelled(chỉ read thôi, ko cud) của mình, teacher ko truy cập được những course archived
    -- student có thể mua những course public, nếu đã mua rồi thì student có thể truy cập course đấy ở tất cả status (trừ cancelled)
    -- course manager có thể nhìn thấy những course public, pending, cancelled (trừ private). Có thể cho nó quản lí cả course archived nữa? (cái này t đang phân vân) 
    `status` varchar(255) not null check(status in ('public', 'private', 'pending', 'cancelled', 'archived')) default('private'),
	foreign key (category_id) references category(id)
);

create table if not exists course_chapter (
	id int primary key auto_increment,
    course_id int not null,
    `name` nvarchar(255) not null,
    sequence_num int not null, -- cái này chạy từ 1...
    description text,
    foreign key (course_id) references course(id)
);

create table if not exists article (
	id int primary key auto_increment,
    chapter_id int not null,
    title nvarchar(255) not null,
    content text not null, -- cái này cũng để markdown (hoặc html) [](/course_id/image/image_id.jpg)
    sequence_num int not null,
    foreign key (chapter_id) references chapter(id)
);

create table if not exists video (
	id int primary key auto_increment,
    chapter_id int not null,
    title nvarchar(255) not null,
    video_file text not null, -- "/course_id/video/material_id.mp4"
    sequence_num int not null,
    foreign key (chapter_id) references chapter(id)
);

create table if not exists quiz (
	id int primary key auto_increment,
    chapter_id int not null,
    title nvarchar(255) not null,
    description text,
    pass_grade double not null default 0.0,
    sequence_num int not null,
    foreign key (chapter_id) references chapter(id)
);

create table if not exists quiz_question (
	id int primary key auto_increment,
    quiz_id int not null,
	`text` text not null,
    explanation text,
    foreign key (quiz_id) references quiz(id)
);

create table if not exists question_option (
	id int primary key auto_increment,
    question_id int not null,
    `text` text not null,
    is_correct boolean not null,
    foreign key (question_id) references quiz_question(id)
);

-- Mẫu quiz.json
-- {
-- 	"pass_grade": 7, -- cái này là số câu đúng để pass cái quiz này
-- 	"questions": [
-- 		{
-- 			"question_id": 1,
-- 			"question_text": "What does HTML [img](id) stand for?",
-- 			"options": [
-- 				{
-- 					"option_id": 1,
-- 					"option_text": "Hyper Text Markup Language",
-- 					"is_correct": true
-- 				},
-- 				{
-- 					"option_id": 2,
-- 					"option_text": "Home Tool Markup Language",
-- 					"is_correct": true
-- 				},
-- 				{
-- 					"option_id": 3,
-- 					"option_text": "Hyperlinks and Text Markup Language",
-- 					"is_correct": false
-- 				},
-- 				{
-- 					"option_id": 4,
-- 					"option_text": "Hyperlinking Text Marking Language",
-- 					"is_correct": false
-- 				}
-- 			],
-- 			-- cái này là giải thích
-- 			"explanation": "HTML stands for Hyper Text Markup Language, which is used to create web pages."
-- 		}
-- 	]
-- }