/*
 Navicat MySQL Data Transfer

 Source Server         : test1
 Source Server Type    : MySQL
 Source Server Version : 50624
 Source Host           : localhost
 Source Database       : nodejs

 Target Server Type    : MySQL
 Target Server Version : 50624
 File Encoding         : utf-8

 Date: 04/15/2016 17:18:25 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;
CREATE DATABASE nodejs;
USE nodejs;
-- ----------------------------
--  Table structure for `t_user`
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL,
  `name` varchar(16) NOT NULL,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `t_quiz_IDX_0` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `t_user`
-- ----------------------------
BEGIN;
INSERT INTO `t_user` VALUES ('1', 'conan', '2016-04-15 01:25:02'), ('2', 'fens.me', '2016-04-15 01:25:02');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
