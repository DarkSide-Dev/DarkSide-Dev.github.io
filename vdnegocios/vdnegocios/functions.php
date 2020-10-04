<?php
##################################################################
/*            alterando pagina de login do painel               */
##################################################################

// alterando logo
function custom_loginlogo() {
echo '<style type="text/css">
	    h1 a {
		    background-image: url('.get_bloginfo('template_directory').'/assets/img/logo.png) !important;
            background-size: auto 100% !important;
            height: 70px !important;
            width: auto !important;
            margin: 0 !important;
        }
    </style>';
}
add_action('login_head', 'custom_loginlogo');

// changing the logo link from wordpress.org to your site
function mb_login_url() {  return home_url(); }
add_filter( 'login_headerurl', 'mb_login_url' );

// changing the alt text on the logo to show your site name
function mb_login_title() { return get_option( 'blogname' ); }
add_filter( 'login_headertitle', 'mb_login_title' );
    
##################################################################
/*                      alterando o painel                      */
##################################################################

// Alterando Texto de rodapé
function diamondcow_footer_admin_text() {
    echo 'Criado para '.get_bloginfo('name');
}
add_filter('admin_footer_text', 'diamondcow_footer_admin_text');

// Removendo ajuda wordpress
function hide_help() {
    echo '<style type="text/css">
            #contextual-help-link-wrap { display: none !important; }
            </style>';
}
add_action('admin_head', 'hide_help');

// Removendo versão do wordpress
function change_footer_version() {
    return '';
}
add_filter( 'update_footer', 'change_footer_version', 9999 );

// Removendo mensagens de updates
function disable_browser_upgrade_warning() {
    remove_meta_box( 'dashboard_browser_nag', 'dashboard', 'normal' );
}
add_action( 'wp_dashboard_setup', 'disable_browser_upgrade_warning' );
    

// Removendo itens admin bar
function remove_item_admin_bar() {
    global $wp_admin_bar;
		$wp_admin_bar->remove_menu('wp-logo');
        $wp_admin_bar->remove_menu('comments');
        $wp_admin_bar->remove_menu('updates');
}
add_action( 'wp_before_admin_bar_render', 'remove_item_admin_bar' );

// Removendo dashboard widgets
function remove_dashboard_meta() {
    remove_meta_box( 'dashboard_incoming_links', 'dashboard', 'normal' );
    remove_meta_box( 'dashboard_plugins', 'dashboard', 'normal' );
    remove_meta_box( 'dashboard_primary', 'dashboard', 'side' );
    remove_meta_box( 'dashboard_secondary', 'dashboard', 'normal' );
    remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
    remove_meta_box( 'dashboard_recent_drafts', 'dashboard', 'side' );
    remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );
    remove_meta_box( 'dashboard_right_now', 'dashboard', 'normal' );
    remove_meta_box( 'dashboard_activity', 'dashboard', 'normal');//since 3.8
}
add_action( 'admin_init', 'remove_dashboard_meta' );
remove_action('welcome_panel', 'wp_welcome_panel');

// ADD DASHBOARD WIDGETS
function custom_dashboard_widgets(){ global $wp_meta_boxes; wp_add_dashboard_widget('support_epm', 'Suporte', 'widget_support'); }
function widget_support(){ echo '<p>Bem-vindo ao painel administrativo do site '.get_bloginfo('name').'!<br>Use os menus ao lado para editar ou adicionar o conteúdo desejado.</p>'; }
add_action('wp_dashboard_setup', 'custom_dashboard_widgets');

// Numbered Pagination
if ( !function_exists( 'wpex_pagination' ) ) {
	
	function wpex_pagination() {
		
		$prev_arrow = is_rtl() ? '→' : '←';
		$next_arrow = is_rtl() ? '←' : '→';
		
		global $wp_query;
		$total = $wp_query->max_num_pages;
		$big = 999999999; // need an unlikely integer
		if( $total > 1 )  {
			 if( !$current_page = get_query_var('paged') )
				 $current_page = 1;
			 if( get_option('permalink_structure') ) {
				 $format = 'page/%#%/';
			 } else {
				 $format = '&paged=%#%';
			 }
			echo paginate_links(array(
				'base'			=> str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
				'format'		=> $format,
				'current'		=> max( 1, get_query_var('paged') ),
				'total' 		=> $total,
				'mid_size'		=> 3,
				'type' 			=> 'list',
				'prev_text'		=> $prev_arrow,
				'next_text'		=> $next_arrow,
			 ) );
		}
	}
	
}