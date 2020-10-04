<?php
/**
* A Simple Category Template
*/
 
get_header(); ?> 
<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header
        mdl-layout--fixed-tabs">
    <header class="mdl-layout__header topbar">
        <div class="mdl-layout__header-row">
            <!-- Title -->
            <div class="btn-back">
                <button onclick="goBack()" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
                    <i class="material-icons">arrow_back</i>
                </button>
            </div>
            <div class="logo"><img src="<?php echo get_template_directory_uri(); ?>/assets/img/logo.svg" alt=""></div>
            <div class="btn-help">
                <button onclick="window.location.href='<?php echo get_site_url(); ?>/help'" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect">
                    <i class="material-icons">help_outline</i>
                </button>
            </div>
        </div>
    </header> 
    <main class="mdl-layout__content">
        <div class="page-content">
            <?php
                $qobj = get_queried_object();
                $args = array(
                    'posts_per_page' => -1,
                    'tax_query' => array(
                    array(
                        'taxonomy' => $qobj->taxonomy,
                        'field' => 'id',
                        'terms' => $qobj->term_id,
                    )
                    )
                );
                $query = new WP_Query( $args );
            ?>
            <?php if ( have_posts() ) : ?>
                <div class="titlepage">
                    <h2><?php single_cat_title(); ?></h2>
                </div>
                <div class="container">
                    <section class="dailyoffer">
                        <?php while ($query->have_posts() ) : $query->the_post(); ?>
                            <div class="daily-product">
                                <div class="dialog-button-<?php echo get_the_ID(); ?>">
                                    <div class="daily-img">
                                    <?php 
                                        $image = get_field('imagem');
                                        if( !empty($image) ): 
                                            // vars
                                            $url = $image['url'];
                                            // thumbnail
                                            $size = 'medium';
                                            $thumb = $image['sizes'][ $size ];
                                        ?>
                                            <img src="<?php echo $thumb; ?>" alt=""/>
                                    <?php endif; ?>
                                    </div>
                                    <div class="daily-info">
                                        <h2><span>R$</span>
                                        <?php
                                        $number = get_field('preco');
                                        echo number_format($number, 2, ',', ' '); 
                                        ?>
                                        </h2>
                                        <h3><?php the_title(); ?></h3>
                                        <h4><?php the_field('gramatura') ?></h4>
                                    </div>
                                </div>
                                <!-- Modal -->
                                <dialog id="dialog-<?php echo get_the_ID(); ?>" class="mdl-dialog">
                                    <?php 
                                        $image = get_field('imagem');
                                        if( !empty($image) ): 
                                            // vars
                                            $url = $image['url'];
                                            // thumbnail
                                            $size = 'medium';
                                            $thumb = $image['sizes'][ $size ];
                                        ?>
                                            <img class="mdl-dialog__img" src="<?php echo $thumb; ?>" alt=""/>
                                    <?php endif; ?>
                                    <h3 class="mdl-dialog__price"><span>R$</span>
                                    <?php
                                    $number = get_field('preco');
                                    echo number_format($number, 2, ',', ' '); 
                                    ?></h3>
                                    <h3 id="dialog-title-<?php echo get_the_ID(); ?>" class="mdl-dialog__title"><?php the_title(); ?></h3>
                                    <div class="mdl-dialog__content">
                                        <p><?php the_field('gramatura') ?></p>
                                        <h2>Limite de unid. por cliente: <?php the_field('unidades') ?></h2>
                                    </div>
                                    <div class="mdl-dialog__actions">
                                        <button type="button" class="mdl-button mdl-dialog__close"><i class="material-icons">close</i></button>
                                        <button onclick="getName<?php echo get_the_ID(); ?>()" class="add_buylist mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect"><i class="material-icons">add_circle</i>Adicionar
                                                    a lista de compras</button>
                                        <div id="demo-toast-example-<?php echo get_the_ID(); ?>" class="mdl-js-snackbar mdl-snackbar">
                                            <div class="mdl-snackbar__text"></div>
                                            <button class="mdl-snackbar__action" type="button"></button>
                                        </div>
                                        <script>
                                            function getName<?php echo get_the_ID(); ?>() {
                                                function add3Dots(string, limit) {
                                                    var dots = "...";
                                                    if (string.length > limit) {
                                                        string = string.substring(0, limit) + dots;
                                                    }
                                                    return string;
                                                }
                                                function addToLocalStorageString (name, value, delimiter) {
                                                    var existing = localStorage.getItem(name);
                                                    var data = existing ? existing + delimiter + value : value;
                                                    localStorage.setItem(name, data);
                                                };
                                                var itemmodal = document.getElementById('dialog-title-<?php echo get_the_ID(); ?>').innerHTML;
                                                var notification = document.querySelector('#demo-toast-example-<?php echo get_the_ID(); ?>');

                                                var data = {
                                                    message: add3Dots(itemmodal, 15) + ' foi adicionado!',
                                                    timeout: 3000
                                                };
                                                notification.MaterialSnackbar.showSnackbar(data);
                                                if (itemmodal) {
                                                    var itemlista = "<li><label class='container-check'>" + itemmodal + "<input class='checkbox' type='checkbox'/><span class='checkmark'></span></label><a class='remove'><i class='material-icons'>close</i></a>";
                                                    addToLocalStorageString('listItems', itemlista, '</li>');
                                                }
                                            }
                                        </script>
                                        <a target="_blank" href="https://wa.me/?text=Confira%20<?php the_title(); ?>%20por%20R$<?php $number = get_field('preco'); echo number_format($number, 2, ',', ' '); ?>%0D%20No%20app%20do%20marinho%20-%20https%3A%2F%2Fmarinho.com.br%2Fdownload" class="share mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect"><i class="material-icons">reply</i></a>
                                    </div>
                                </dialog>
                                <script>
                                    (function () {
                                        'use strict';
                                        var dialogButton = document.querySelector('.dialog-button-<?php echo get_the_ID(); ?>');
                                        var dialog = document.querySelector('#dialog-<?php echo get_the_ID(); ?>');
                                        if (!dialog.showModal) {
                                            dialogPolyfill.registerDialog(dialog);
                                        }
                                        dialogButton.addEventListener('click', function () {
                                            dialog.showModal();
                                        });
                                        dialog.querySelector('.mdl-dialog__close').addEventListener('click', function () {
                                            dialog.close();
                                        });
                                        window.addEventListener('click', function (event) {
                                            if (event.target == dialog) {
                                                dialog.close();
                                            }
                                        });
                                    }());
                                </script>
                                <!-- END Modal -->
                            </div>
                            <?php endwhile; ?>
                            <?php wp_reset_postdata();?>
                    </section>
                </div>
                <?php else: ?>
                <p>Desculpe, não temos produtos publicados.</p>
            <?php endif; ?>
        </div>
    </main>
</div>
<?php get_footer(); ?>


