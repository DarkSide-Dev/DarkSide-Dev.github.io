<?php get_header(); ?>
<?php get_template_part('inc/nav')?>
<div class="titlepage">
    <h2><?php the_title(); ?></h2>
</div>
<main role="main" class="inner">
    <div class="container">
        <div class="page-container">
            <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
                    <?php the_content(); ?>
            <?php endwhile; endif; ?>
            <?php wp_reset_postdata();  ?>
        </div>
    </div>
</main>

<?php get_footer(); ?>