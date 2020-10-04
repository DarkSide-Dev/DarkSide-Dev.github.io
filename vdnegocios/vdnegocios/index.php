<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage contelamor
 * @since Contelamor 1.0
 */

get_header(); ?>


        <?php require_once('includes/header.php') ?>
        
        <?php require_once('includes/banner.php') ?>

        <?php require_once('includes/asking_area.php') ?>

        <?php require_once('includes/execute_better.php') ?>

        <?php require_once('includes/patrons.php') ?>

        <?php require_once('includes/meth.php') ?>

        <?php require_once('includes/main_points.php') ?>

        <?php require_once('includes/contact.php') ?>

        <?php require_once('includes/footer.php') ?>

<?php get_footer(); ?>
