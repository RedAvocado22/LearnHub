-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: learnhub
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` (`created_at`, `id`, `avatar`, `email`, `first_name`, `last_name`, `password`, `role`, `status`) VALUES ('2025-04-12 15:52:31.000000',1,NULL,'learnhub391@gmail.com','Bao','Doan Quoc','$2a$10$NdlRe2ubz18WLfBoxopw1.051vq9Ek2jkGQJ00WjBL2hQv3R3BPDa','ADMIN','ACTIVE'); -- ABC@123
INSERT INTO `account` (`created_at`, `id`, `avatar`, `email`, `first_name`, `last_name`, `password`, `role`, `status`) VALUES ('2025-04-12 15:52:31.000000',2,NULL,'doanquocbaooooooo@gmail.com','BaoS','Doan Quoc','$2a$10$BHIFmEpxSFaUGlcsCp5F5usmJirNKINm6eRkhy/rr8YgcO4QcED/m','STUDENT','ACTIVE'); -- ABC@456
INSERT INTO `account` (`created_at`, `id`, `avatar`, `email`, `first_name`, `last_name`, `password`, `role`, `status`) VALUES ('2025-04-12 15:52:31.000000',3,NULL,'doanbao2506@gmail.com','BaoT1','Doan Quoc','$2a$10$WG7RjXtZRyBjj6388I8fROrCr5AFWp2wnUXUFLrDYoazEDxZ4kWlC','TEACHER','ACTIVE'); -- ABC@789
INSERT INTO `account` (`created_at`, `id`, `avatar`, `email`, `first_name`, `last_name`, `password`, `role`, `status`) VALUES ('2025-04-12 15:52:31.000000',4,NULL,'doanqbao2506@gmail.com','BaoT2','Doan Quoc','$2a$10$m7C2R4n7BAxTGlZ1obEM0uH2iCBn.KwpE8s8GEY9QTeKZ62e1eibm','TEACHER','ACTIVE'); -- ABC@012
INSERT INTO `account` (`created_at`, `id`, `avatar`, `email`, `first_name`, `last_name`, `password`, `role`, `status`) VALUES ('2025-04-12 15:52:31.000000',5,NULL,'minhcuong2922004@gmail.com','CuongCM','Minh Cuong','$2a$10$m7C2R4n7BAxTGlZ1obEM0uH2iCBn.KwpE8s8GEY9QTeKZ62e1eibm','COURSE_MANAGER','ACTIVE'); -- ABC@012
INSERT INTO `account` (`created_at`, `id`, `avatar`, `email`, `first_name`, `last_name`, `password`, `role`, `status`) VALUES ('2025-04-12 15:52:31.000000',6,NULL,'coursemanager@gmail.com','Course','Manager','$2a$10$m7C2R4n7BAxTGlZ1obEM0uH2iCBn.KwpE8s8GEY9QTeKZ62e1eibm','COURSE_MANAGER','ACTIVE'); -- ABC@012
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `student_profile`
--

LOCK TABLES `student_profile` WRITE;
/*!40000 ALTER TABLE `student_profile` DISABLE KEYS */;
INSERT INTO `student_profile` (`account_id`, `school`, `type`) VALUES (2,'FPT University','GRADE11');
/*!40000 ALTER TABLE `student_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `teacher_profile`
--

LOCK TABLES `teacher_profile` WRITE;
/*!40000 ALTER TABLE `teacher_profile` DISABLE KEYS */;
INSERT INTO `teacher_profile` (`account_id`, `biography`, `city`, `major`, `phone`, `website`, `work_address`) VALUES (3,'A normal math teacher','Hanoi','Math 12','0382633428','https://youtube.com','FPT University');
INSERT INTO `teacher_profile` (`account_id`, `biography`, `city`, `major`, `phone`, `website`, `work_address`) VALUES (4,NULL,'Ho Chi Minh city','Literature 11','0123456789','https://google.com','ABC School');
/*!40000 ALTER TABLE `teacher_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `manager_profile`
--

LOCK TABLES `manager_profile` WRITE;
/*!40000 ALTER TABLE `manager_profile` DISABLE KEYS */;
INSERT INTO `manager_profile` (`account_id`, `department`) VALUES (5,'Math');
INSERT INTO `manager_profile` (`account_id`, `department`) VALUES (6,'Literature');
/*!40000 ALTER TABLE `manager_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `answered_option`
--

LOCK TABLES `answered_option` WRITE;
/*!40000 ALTER TABLE `answered_option` DISABLE KEYS */;
/*!40000 ALTER TABLE `answered_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `attempted_question`
--

LOCK TABLES `attempted_question` WRITE;
/*!40000 ALTER TABLE `attempted_question` DISABLE KEYS */;
/*!40000 ALTER TABLE `attempted_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`id`, `name`) VALUES (1,'Calculus');
INSERT INTO `category` (`id`, `name`) VALUES (2,'Algebra');
INSERT INTO `category` (`id`, `name`) VALUES (3,'Vietnam\'s Literature');
INSERT INTO `category` (`id`, `name`) VALUES (4,'Foreign Literature');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` (`account_id`, `created_at`, `id`, `email`, `first_name`, `last_name`, `manager_department`, `message`, `phone`, `subject`, `teacher_biography`, `teacher_city`, `teacher_major`, `teacher_website`, `teacher_work_address`) VALUES (NULL,'2025-04-13 00:21:40.150364',1,'baodqhe180053@fpt.edu.vn','BaoT3','Doan Quoc',NULL,'I want to become a teacher!!!','2345678901','Want to become a teacher',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` (`price`, `archived_at`, `assign_at`, `cancelled_at`, `category_id`, `created_at`, `id`, `manager_id`, `teacher_id`, `updated_at`, `description`, `image`, `name`, `status`) VALUES (100.00,NULL,'2025-04-12 17:41:06.385948','2025-04-12 17:52:18.252031',2,'2025-04-12 16:45:02.553453',1,5,3,'2025-04-12 17:43:25.810881','This course teach you basic algebra. After finished this course, you can do basic operations like addition, subtraction, multiplication, division,...','uploads/69834889-2da3-46e8-ba1e-930a31910bbb.jpg','Basic Algebra','PUBLIC');
INSERT INTO `course` (`price`, `archived_at`, `assign_at`, `cancelled_at`, `category_id`, `created_at`, `id`, `manager_id`, `teacher_id`, `updated_at`, `description`, `image`, `name`, `status`) VALUES (200.00,NULL,NULL,'2025-04-12 17:58:25.687439',1,'2025-04-12 17:57:45.468960',2,NULL,3,NULL,'This course teach you calculus','uploads/c60f9681-44d2-4677-88ca-481e1a7cc0c3.jpg','Basic Calculus','PRIVATE');
INSERT INTO `course` (`price`, `archived_at`, `assign_at`, `cancelled_at`, `category_id`, `created_at`, `id`, `manager_id`, `teacher_id`, `updated_at`, `description`, `image`, `name`, `status`) VALUES (530.00,NULL,'2025-04-12 23:31:02.376587',NULL,1,'2025-04-12 23:16:31.431291',3,5,3,'2025-04-12 23:29:02.053418','Advanced calculus for good students.','uploads/591015d9-1dda-47f5-9b10-73927275f1ba.jpg','Advanced Calculus','PUBLIC');
INSERT INTO `course` (`price`, `archived_at`, `assign_at`, `cancelled_at`, `category_id`, `created_at`, `id`, `manager_id`, `teacher_id`, `updated_at`, `description`, `image`, `name`, `status`) VALUES (400.00,NULL,'2025-04-12 23:30:57.755847',NULL,2,'2025-04-12 23:17:23.396556',4,5,3,'2025-04-12 23:29:21.621227','Advanced algebra.','uploads/7b83d267-da67-4357-b335-8f4006ab9baf.jpg','Advanced Algebra','PUBLIC');
INSERT INTO `course` (`price`, `archived_at`, `assign_at`, `cancelled_at`, `category_id`, `created_at`, `id`, `manager_id`, `teacher_id`, `updated_at`, `description`, `image`, `name`, `status`) VALUES (120.00,NULL,'2025-04-12 23:41:33.151271',NULL,3,'2025-04-12 23:38:26.281890',5,6,4,'2025-04-12 23:40:32.173594','Step by step guide to write an essay with Chi Pheo.','uploads/39c3b7b2-becf-4636-811d-11a45d5a4819.png','How to write an essay for Chi Pheo','PUBLIC');
INSERT INTO `course` (`price`, `archived_at`, `assign_at`, `cancelled_at`, `category_id`, `created_at`, `id`, `manager_id`, `teacher_id`, `updated_at`, `description`, `image`, `name`, `status`) VALUES (30.00,NULL,'2025-04-12 23:41:30.608732',NULL,3,'2025-04-12 23:39:08.194620',6,6,4,'2025-04-12 23:40:34.137659','Explain what is rhetorical questions and how to use it.','uploads/b0f054b9-684b-477a-8a67-16033bb4b366.png','Rhetorical questions','PUBLIC');
INSERT INTO `course` (`price`, `archived_at`, `assign_at`, `cancelled_at`, `category_id`, `created_at`, `id`, `manager_id`, `teacher_id`, `updated_at`, `description`, `image`, `name`, `status`) VALUES (90.00,NULL,'2025-04-12 23:41:27.553653',NULL,4,'2025-04-12 23:39:46.418561',7,6,4,'2025-04-12 23:40:35.437393','Introduction to some of the piece of Andersen.','uploads/759f0d77-92b6-407c-8029-63546de2e95f.jpg','Introduction to Andersen','PUBLIC');
INSERT INTO `course` (`price`, `archived_at`, `assign_at`, `cancelled_at`, `category_id`, `created_at`, `id`, `manager_id`, `teacher_id`, `updated_at`, `description`, `image`, `name`, `status`) VALUES (100.00,NULL,'2025-04-12 23:41:23.879194',NULL,4,'2025-04-12 23:40:17.920761',8,6,4,'2025-04-12 23:40:37.704449','Compare literature in vietnam to that in other countries.','uploads/50d42cec-df53-459f-81ac-3ba6537963b7.jpg','Vietnam\'s Literature vs Foreign Literature','PUBLIC');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `course_chapter`
--

LOCK TABLES `course_chapter` WRITE;
/*!40000 ALTER TABLE `course_chapter` DISABLE KEYS */;
INSERT INTO `course_chapter` (`course_id`, `id`, `title`) VALUES (1,1,'Introduction to basic arithmetic');
INSERT INTO `course_chapter` (`course_id`, `id`, `title`) VALUES (2,2,'Chapter 1');
/*!40000 ALTER TABLE `course_chapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `chapter_material`
--

LOCK TABLES `chapter_material` WRITE;
/*!40000 ALTER TABLE `chapter_material` DISABLE KEYS */;
INSERT INTO `chapter_material` (`chapter_id`, `id`, `description`, `name`, `type`) VALUES (1,1,'This lesson teach you how to do addition between difference type of number.','How to do addition','LESSON');
INSERT INTO `chapter_material` (`chapter_id`, `id`, `description`, `name`, `type`) VALUES (1,2,'Test how you grasp the content of the previous lesson.','Small test for addition','QUIZ');
INSERT INTO `chapter_material` (`chapter_id`, `id`, `description`, `name`, `type`) VALUES (1,3,'This lesson teach you how to do subtraction','How to do subtraction','LESSON');
INSERT INTO `chapter_material` (`chapter_id`, `id`, `description`, `name`, `type`) VALUES (2,4,'In this lesson, you\'ll learn what limits are and why they\'re foundational to calculus. We\'ll explore how limits describe the behavior of functions as inputs approach specific values. You\'ll also see simple examples to build your intuition.','Introduction to Limits','LESSON');
INSERT INTO `chapter_material` (`chapter_id`, `id`, `description`, `name`, `type`) VALUES (2,5,'This lesson explains the concept of derivatives — the core of differential calculus. Basic rules of differentiation will be introduced with examples.','What is a Derivative?','LESSON');
INSERT INTO `chapter_material` (`chapter_id`, `id`, `description`, `name`, `type`) VALUES (2,6,'Assess your knowledge of derivatives with this short quiz covering the concepts discussed in the previous lessons.','Derivative Concepts Quiz','QUIZ');

/*!40000 ALTER TABLE `chapter_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `course_purchase`
--

LOCK TABLES `course_purchase` WRITE;
/*!40000 ALTER TABLE `course_purchase` DISABLE KEYS */;
INSERT INTO `course_purchase` (`purchase_price`, `course_id`, `purchased_at`, `student_id`, `status`, `transaction_id`) VALUES (255600000.00,1,'2025-04-12 18:49:09.644319',2,'SUCCESS','14904097');
/*!40000 ALTER TABLE `course_purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `enrollment`
--

LOCK TABLES `enrollment` WRITE;
/*!40000 ALTER TABLE `enrollment` DISABLE KEYS */;
INSERT INTO `enrollment` (`course_id`, `enrolled_at`, `finished_at`, `student_id`, `status`) VALUES (1,'2025-04-12 18:49:09.695108',NULL,2,'IN_PROGRESS');
/*!40000 ALTER TABLE `enrollment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `finished_material`
--

LOCK TABLES `finished_material` WRITE;
/*!40000 ALTER TABLE `finished_material` DISABLE KEYS */;
/*!40000 ALTER TABLE `finished_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `lesson`
--

LOCK TABLES `lesson` WRITE;
/*!40000 ALTER TABLE `lesson` DISABLE KEYS */;
INSERT INTO `lesson` (`material_id`, `video_url`) VALUES (1,'uploads/53dc22f6-0e18-46e2-9832-90517e4ddc8d.mp4');
INSERT INTO `lesson` (`material_id`, `video_url`) VALUES (3,'uploads/5c5b9e18-2cea-4a0e-be13-bdb75fcbab15.mp4');
INSERT INTO `lesson` (`material_id`, `video_url`) VALUES (4,'uploads/1789e01a-b6a5-40f8-9171-600ce3c811f1.mp4');
INSERT INTO `lesson` (`material_id`, `video_url`) VALUES (5,'uploads/c068eae2-b452-4e20-ae50-441b48c2c880.mp4');
/*!40000 ALTER TABLE `lesson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `lesson_material`
--

LOCK TABLES `lesson_material` WRITE;
/*!40000 ALTER TABLE `lesson_material` DISABLE KEYS */;
INSERT INTO `lesson_material` (`id`, `lesson_id`, `file_url`, `name`) VALUES (1,1,'uploads/936f1ee1-3879-4d9c-a322-58684359f42e.pdf','Material 1');
INSERT INTO `lesson_material` (`id`, `lesson_id`, `file_url`, `name`) VALUES (2,3,'uploads/d91b7700-3ae8-4cad-9dbd-10c1fe0a2c63.pdf','Material 1');
INSERT INTO `lesson_material` (`id`, `lesson_id`, `file_url`, `name`) VALUES (3,4,'uploads/46339ec2-be68-4c50-8653-aa8284c671d7.pdf','Material 1');
INSERT INTO `lesson_material` (`id`, `lesson_id`, `file_url`, `name`) VALUES (4,5,'uploads/fea6ada1-b6aa-43dc-a82b-f5ee94783dec.png','Material 1');
/*!40000 ALTER TABLE `lesson_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` (`pass_grade`, `material_id`) VALUES (2,2);
INSERT INTO `quiz` (`pass_grade`, `material_id`) VALUES (2,6);
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `quiz_question`
--

LOCK TABLES `quiz_question` WRITE;
/*!40000 ALTER TABLE `quiz_question` DISABLE KEYS */;
INSERT INTO `quiz_question` (`id`, `quiz_id`, `explanation`, `text`) VALUES (1,2,'This is a very basic question, no explanation.','1 + 1');
INSERT INTO `quiz_question` (`id`, `quiz_id`, `explanation`, `text`) VALUES (2,2,'Very confusing question isn\'t it?','1234567890 + 9876543210');
INSERT INTO `quiz_question` (`id`, `quiz_id`, `explanation`, `text`) VALUES (3,2,'You just need to replace the 0 with the 9.','9 + 10');
INSERT INTO `quiz_question` (`id`, `quiz_id`, `explanation`, `text`) VALUES (4,6,'The derivative measures how a function changes as its input changes — in other words, it\'s the instantaneous rate of change or the slope of the tangent line to the function at a point. It does not represent area or averages.','What does the derivative of a function represent?');
INSERT INTO `quiz_question` (`id`, `quiz_id`, `explanation`, `text`) VALUES (5,6,'Using basic differentiation rules (the power rule), the derivative of x² is: d/dx (x²) = 2x.\nSo the correct answer is 2x.','If f(x) = x², what is f′(x)?');
INSERT INTO `quiz_question` (`id`, `quiz_id`, `explanation`, `text`) VALUES (6,6,'The limit definition of the derivative is:\nf′(x) = lim(h→0) [f(x + h) - f(x)] / h.\nThis expression represents the slope of the secant line becoming the tangent as h approaches 0. The other options are not related to derivative definitions.','Which of the following is the limit definition of a derivative?');
/*!40000 ALTER TABLE `quiz_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `question_option`
--

LOCK TABLES `question_option` WRITE;
/*!40000 ALTER TABLE `question_option` DISABLE KEYS */;
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '\0',1,1,'1');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '',2,1,'2');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '\0',3,1,'3');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '',4,1,'10 (binary)');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '\0',5,2,'Hello World');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '\0',6,2,'10000000000');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '',7,2,'11111111100');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '\0',8,2,'Infinity');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '',9,3,'19');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '\0',10,3,'21');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '\0',11,3,'109');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '\0',12,3,'910');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '\0',13,4,'The area under the curve');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '\0',14,4,'The average value of the function');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '',15,4,'The rate of change of the function');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '\0',16,4,'The maximum value of the function');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '',17,5,'2x');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '\0',18,5,'x');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '\0',19,5,'x²');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '\0',20,5,'2');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '',21,6,'lim(h→0) [f(x + h) - f(x)] / h');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '\0',22,6,'lim(x→0) [f(x)] / x');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '\0',23,6,'lim(h→1) [f(x + h) - f(x)]');
INSERT INTO `question_option` (`correct`, `id`, `question_id`, `text`) VALUES (_binary '\0',24,6,'lim(x→∞) f(x)');
/*!40000 ALTER TABLE `question_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `quiz_attempt`
--

LOCK TABLES `quiz_attempt` WRITE;
/*!40000 ALTER TABLE `quiz_attempt` DISABLE KEYS */;
/*!40000 ALTER TABLE `quiz_attempt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` (`star`, `account_id`, `course_id`, `created_at`, `id`, `updated_at`, `comment`) VALUES (4,2,1,'2025-04-12 22:48:19.297017',1,NULL,'This course is very good!!');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `revoked_token`
--

LOCK TABLES `revoked_token` WRITE;
/*!40000 ALTER TABLE `revoked_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `revoked_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_document`
--

LOCK TABLES `user_document` WRITE;
/*!40000 ALTER TABLE `user_document` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_document` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-12 18:01:18
