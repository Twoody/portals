<?php
/******************************************************************************
   Author:  Tanner.L.Woody@gmail.com
   WebLink: github.com/twoody/phpTests/utils/html.php
   Date:    20190420

USAGE:
   In php, put at the head of function:
      $STRINGS = get_config_string($CONFIG);
		$LI		= new LoremIpsum

Purpose:
    General Util Library to ensure we have minimal errors while outputting HTML.
Links:
	https://github.com/joshtronic/php-loremipsum/blob/master/src/LoremIpsum.php
******************************************************************************/


echo "\n<!-- RESOURCE FILE: ".$PATHS['STRINGS_PHP']." -->\n";
function get_config_strings($CONFIG=Null){
	if ($CONFIG === Null){
		$ROOT = ".";
		require_once($ROOT . '/config/paths.php');
		$PATHS	= get_paths($ROOT);
		require_once($PATHS['SETTINGS_PATH']);
		$CONFIG	= get_config();
	}
	$ROOT		= $CONFIG['ROOT'];
	$PATHS	= get_paths($ROOT);

	return Array(
		'404'=>'The page you are looking for was not found',
		"AD_SMALL_TEXT_1"=>"\n\t\t\t\tButton 1 to Link 1",
		"AD_SMALL_TEXT_2"=>"\n\t\t\t\tButton 2 to Link 2",
		"AD_TEXT"=>"\n\t\t\t\tSome quick example text to build on the card title and make up the bulk of the card's content.",
		"AD_TITLE"=>"Card title",
		"ALREADY_LOGGED_IN"=>"You are ALREADY logged in.",
		"ADMIN_SQL_USERS" =>"Users MGMT",
		"BLOG_COMMENTS"=>"Please Leave a Response:",
		"BRAND"=>"Portals",
		"CLOSE_X"=>"&times;",
		"CLOSE"=>"Close",
		"CONTACT_ADMIN"=>"Don't see what you are looking for? Contact " .$CONFIG['EMAIL_ADMIN'] . ".",
		"CURRENCY"=>"$$$",
		"DASHBOARD"=>"Dashboard",
		"DASHBOARD_ADMIN"=>"Admin Dashboard",
		"DASHBOARD_GREETING"=> "Howdy, ". get_user_fname($CONFIG),
		"DASHBOARD_GO_SHOP"=> "Go Buy More Stuff",
		"DASHBOARD_VIEW_INV"=>"View Current Inventory",
		"DELETE_ENTRY"=>"Delete Entry",
		"DISCLAIMER"=>"<b>This page is in the works. </b> To start it off, I decided to work with a blog-esque platform first and do two birds with one stone. What you are seeing here is a quote followed by all randomly generated lorem ispum text followed by a block quote at the end. My next step is to plug in some jQuery so that different MVVM features work in reference to a drop-down navigation menu. This menu will reset the text on the page and work as a navigator for all of the fun and interesting aspects that exist on this site. Each text will explain how the features are helpful in both the computer science and professional industries.",
		"BLOG_404"=>"Sorry, we did not find the blog that you are looking for.",
		"BLOGS_TITLE"=>"Blog",
		"FEATURES_RESET"=>'Reset? Sure, here is some randomly generated Lorem Ipsum text.',
		"FEATURES_TITLE"=>'Features',
		"GET_PURPOSE"=>"What would you like to do today?",
		"GEN_OR"=>" or ",
		"HELPFUL_LINKS"=>'Here are some helpful links:',
		"HOME_TITLE"=>"Work in Progress",
		"LOGOUT"=>'Logout',
		"LOGOUT_SUCCESS"=>'Successfully logged out',
		"LOGOUT_WARNING"=>"Warning, not logged in",
		"MODAL_HEADER"=>"Modal Header",
		"NAV_ADMIN"=>"Admin",
		"NAV_HOME"=>"Home",
		"NAV_ITEM2"=>"Features",
		"NAV_ITEM3"=>"Pricing",
		"NAV_ITEM4"=>"Blog",
		"NAV_REGISTER"=>"Register Now",
		"NAV_SIGN_IN"=>"Sign In",
		"NAV_WELCOME"=>"Welcome, " . get_user_fname($CONFIG),
		"NO_COMMENT"=>"Please provide a comment...",
		"QUOTE_OSHO"=>"Falling in love you remain a child; rising in love you mature. By and by love becomes not a relationship, it becomes a state of your being. Not that you are in love - now you are love.",
		"QUOTE_TIM_BERNER"=>"The Semantic Web is not a separate Web but an extension of the current one, in which information is given well-defined meaning, better enabling computers and people to work in cooperation.",
		"QUOTE_RICHARD_BACH"=>"There is no such thing as a problem without a gift for us in its hands. We seek problems because we need their gifts.",
		"RET_HOME"=>"Return Home",
		"REGISTER"=>"Register",
		"SHOPPING_TITLE"=>"Shop's Inventory",
		"UNDER_CONSTRUCTION"=>'Sorry, this page is under consturction;',
		"UNDER_CONSTRUCTION_TITLE"=>'IN CONSTRUCTION',
		"UNDER_CONSTRUCTION_HEADER"=>'PAGE IN CONSTRUCTION',
		"USER_ACCESS_LEVEL"=> "You are logged in as a ".get_user_access_level($CONFIG).".",
		"USER_INVALID_PERMISSION"=> "Warning: Access Denied;",
		"USER_NOT_LOGGED_IN"=> "Warning, not logged in;",
//TODO: Get rid of html...
		"USER_PW_REQS" => "\n<small id=\"passwordHelpBlock\" class=\"form-text text-muted\">Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.</small>\n",
		"VIEW_INV_TEXT"=>"Some text before the checkout list.",
	);
}

/***** Just for testing *****/
//echo get_config_strings() . "\n";

class LoremIpsum
{
    /**
     * First
     *
     * Whether or not we should be starting the string with "Lorem ipsum..."
     *
     * @access private
     * @var    boolean
     */
    private $first = true;

    /**
     * Words
     *
     * A lorem ipsum vocabulary of sorts. Not a complete list as I'm unsure if
     * a complete list exists and if so, where to get it.
     *
     * @access private
     * @var    array
     */
    public $words = array(
        // Lorem ipsum...
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',

        // and the rest of the vocabulary
        'a', 'ac', 'accumsan', 'ad', 'aenean', 'aliquam', 'aliquet', 'ante',
        'aptent', 'arcu', 'at', 'auctor', 'augue', 'bibendum', 'blandit',
        'class', 'commodo', 'condimentum', 'congue', 'consequat', 'conubia',
        'convallis', 'cras', 'cubilia', 'curabitur', 'curae', 'cursus',
        'dapibus', 'diam', 'dictum', 'dictumst', 'dignissim', 'dis', 'donec',
        'dui', 'duis', 'efficitur', 'egestas', 'eget', 'eleifend', 'elementum',
        'enim', 'erat', 'eros', 'est', 'et', 'etiam', 'eu', 'euismod', 'ex',
        'facilisi', 'facilisis', 'fames', 'faucibus', 'felis', 'fermentum',
        'feugiat', 'finibus', 'fringilla', 'fusce', 'gravida', 'habitant',
        'habitasse', 'hac', 'hendrerit', 'himenaeos', 'iaculis', 'id',
        'imperdiet', 'in', 'inceptos', 'integer', 'interdum', 'justo',
        'lacinia', 'lacus', 'laoreet', 'lectus', 'leo', 'libero', 'ligula',
        'litora', 'lobortis', 'luctus', 'maecenas', 'magna', 'magnis',
        'malesuada', 'massa', 'mattis', 'mauris', 'maximus', 'metus', 'mi',
        'molestie', 'mollis', 'montes', 'morbi', 'mus', 'nam', 'nascetur',
        'natoque', 'nec', 'neque', 'netus', 'nibh', 'nisi', 'nisl', 'non',
        'nostra', 'nulla', 'nullam', 'nunc', 'odio', 'orci', 'ornare',
        'parturient', 'pellentesque', 'penatibus', 'per', 'pharetra',
        'phasellus', 'placerat', 'platea', 'porta', 'porttitor', 'posuere',
        'potenti', 'praesent', 'pretium', 'primis', 'proin', 'pulvinar',
        'purus', 'quam', 'quis', 'quisque', 'rhoncus', 'ridiculus', 'risus',
        'rutrum', 'sagittis', 'sapien', 'scelerisque', 'sed', 'sem', 'semper',
        'senectus', 'sociosqu', 'sodales', 'sollicitudin', 'suscipit',
        'suspendisse', 'taciti', 'tellus', 'tempor', 'tempus', 'tincidunt',
        'torquent', 'tortor', 'tristique', 'turpis', 'ullamcorper', 'ultrices',
        'ultricies', 'urna', 'ut', 'varius', 'vehicula', 'vel', 'velit',
        'venenatis', 'vestibulum', 'vitae', 'vivamus', 'viverra', 'volutpat',
        'vulputate',
    );

    /**
     * Word
     *
     * Generates a single word of lorem ipsum.
     *
     * @access public
     * @param  mixed  $tags string or array of HTML tags to wrap output with
     * @return string generated lorem ipsum word
     */
    public function word($tags = false)
    {
        return $this->words(1, $tags);
    }

    /**
     * Words Array
     *
     * Generates an array of lorem ipsum words.
     *
     * @access public
     * @param  integer $count how many words to generate
     * @param  mixed   $tags string or array of HTML tags to wrap output with
     * @return array   generated lorem ipsum words
     */
    public function wordsArray($count = 1, $tags = false)
    {
        return $this->words($count, $tags, true);
    }

    /**
     * Words
     *
     * Generates words of lorem ipsum.
     *
     * @access public
     * @param  integer $count how many words to generate
     * @param  mixed   $tags string or array of HTML tags to wrap output with
     * @param  boolean $array whether an array or a string should be returned
     * @return mixed   string or array of generated lorem ipsum words
     */
    public function words($count = 1, $tags = false, $array = false)
    {
        $words      = array();
        $word_count = 0;

        // Shuffles and appends the word list to compensate for count
        // arguments that exceed the size of our vocabulary list
        while ($word_count < $count) {
            $shuffle = true;

            while ($shuffle) {
                $this->shuffle();

                // Checks that the last word of the list and the first word of
                // the list that's about to be appended are not the same
                if (!$word_count || $words[$word_count - 1] != $this->words[0]) {
                    $words      = array_merge($words, $this->words);
                    $word_count = count($words);
                    $shuffle    = false;
                }
            }
        }

        $words = array_slice($words, 0, $count);

        return $this->output($words, $tags, $array);
    }

    /**
     * Sentence
     *
     * Generates a full sentence of lorem ipsum.
     *
     * @access public
     * @param  mixed  $tags string or array of HTML tags to wrap output with
     * @return string generated lorem ipsum sentence
     */
    public function sentence($tags = false)
    {
        return $this->sentences(1, $tags);
    }

    /**
     * Sentences Array
     *
     * Generates an array of lorem ipsum sentences.
     *
     * @access public
     * @param  integer $count how many sentences to generate
     * @param  mixed   $tags string or array of HTML tags to wrap output with
     * @return array   generated lorem ipsum sentences
     */
    public function sentencesArray($count = 1, $tags = false)
    {
        return $this->sentences($count, $tags, true);
    }

    /**
     * Sentences
     *
     * Generates sentences of lorem ipsum.
     *
     * @access public
     * @param  integer $count how many sentences to generate
     * @param  mixed   $tags string or array of HTML tags to wrap output with
     * @param  boolean $array whether an array or a string should be returned
     * @return mixed   string or array of generated lorem ipsum sentences
     */
    public function sentences($count = 1, $tags = false, $array = false)
    {
        $sentences = array();

        for ($i = 0; $i < $count; $i++) {
            $sentences[] = $this->wordsArray($this->gauss(24.46, 5.08));
        }

        $this->punctuate($sentences);

        return $this->output($sentences, $tags, $array);
    }

    /**
     * Paragraph
     *
     * Generates a full paragraph of lorem ipsum.
     *
     * @access public
     * @param  mixed  $tags string or array of HTML tags to wrap output with
     * @return string generated lorem ipsum paragraph
     */
    public function paragraph($tags = false)
    {
        return $this->paragraphs(1, $tags);
    }

    /**
     * Paragraph Array
     *
     * Generates an array of lorem ipsum paragraphs.
     *
     * @access public
     * @param  integer $count how many paragraphs to generate
     * @param  mixed   $tags string or array of HTML tags to wrap output with
     * @return array   generated lorem ipsum paragraphs
     */
    public function paragraphsArray($count = 1, $tags = false)
    {
        return $this->paragraphs($count, $tags, true);
    }

    /**
     * Paragraphss
     *
     * Generates paragraphs of lorem ipsum.
     *
     * @access public
     * @param  integer $count how many paragraphs to generate
     * @param  mixed   $tags string or array of HTML tags to wrap output with
     * @param  boolean $array whether an array or a string should be returned
     * @return mixed   string or array of generated lorem ipsum paragraphs
     */
    public function paragraphs($count = 1, $tags = false, $array = false)
    {
        $paragraphs = array();

        for ($i = 0; $i < $count; $i++) {
            $paragraphs[] = $this->sentences($this->gauss(5.8, 1.93));
        }

        return $this->output($paragraphs, $tags, $array, "\n\n");
    }

    /**
     * Gaussian Distribution
     *
     * This is some smart kid stuff. I went ahead and combined the N(0,1) logic
     * with the N(m,s) logic into this single function. Used to calculate the
     * number of words in a sentence, the number of sentences in a paragraph
     * and the distribution of commas in a sentence.
     *
     * @access private
     * @param  double  $mean average value
     * @param  double  $std_dev stadnard deviation
     * @return double  calculated distribution
     */
    private function gauss($mean, $std_dev)
    {
        $x = mt_rand() / mt_getrandmax();
        $y = mt_rand() / mt_getrandmax();
        $z = sqrt(-2 * log($x)) * cos(2 * pi() * $y);

        return $z * $std_dev + $mean;
    }

    /**
     * Shuffle
     *
     * Shuffles the words, forcing "Lorem ipsum..." at the beginning if it is
     * the first time we are generating the text.
     *
     * @access private
     */
    private function shuffle()
    {
        if ($this->first) {
            $this->first = array_slice($this->words, 0, 8);
            $this->words = array_slice($this->words, 8);

            shuffle($this->words);

            $this->words = $this->first + $this->words;

            $this->first = false;
        } else {
            shuffle($this->words);
        }
    }

    /**
     * Punctuate
     *
     * Applies punctuation to a sentence. This includes a period at the end,
     * the injection of commas as well as capitalizing the first letter of the
     * first word of the sentence.
     *
     * @access private
     * @param  array   $sentences the sentences we would like to punctuate
     */
    private function punctuate(&$sentences)
    {
        foreach ($sentences as $key => $sentence) {
            $words = count($sentence);

            // Only worry about commas on sentences longer than 4 words
            if ($words > 4) {
                $mean    = log($words, 6);
                $std_dev = $mean / 6;
                $commas  = round($this->gauss($mean, $std_dev));

                for ($i = 1; $i <= $commas; $i++) {
                    $word = round($i * $words / ($commas + 1));

                    if ($word < ($words - 1) && $word > 0) {
                        $sentence[$word] .= ',';
                    }
                }
            }

            $sentences[$key] = ucfirst(implode(' ', $sentence) . '.');
        }
    }

    /**
     * Output
     *
     * Does the rest of the processing of the strings. This includes wrapping
     * the strings in HTML tags, handling transformations with the ability of
     * back referencing and determining if the passed array should be converted
     * into a string or not.
     *
     * @access private
     * @param  array   $strings an array of generated strings
     * @param  mixed   $tags string or array of HTML tags to wrap output with
     * @param  boolean $array whether an array or a string should be returned
     * @param  string  $delimiter the string to use when calling implode()
     * @return mixed   string or array of generated lorem ipsum text
     */
    private function output($strings, $tags, $array, $delimiter = ' ')
    {
        if ($tags) {
            if (!is_array($tags)) {
                $tags = array($tags);
            } else {
                // Flips the array so we can work from the inside out
                $tags = array_reverse($tags);
            }

            foreach ($strings as $key => $string) {
                foreach ($tags as $tag) {
                    // Detects / applies back reference
                    if ($tag[0] == '<') {
                        $string = str_replace('$1', $string, $tag);
                    } else {
                        $string = sprintf('<%1$s>%2$s</%1$s>', $tag, $string);
                    }

                    $strings[$key] = $string;
                }
            }
        }

        if (!$array) {
            $strings = implode($delimiter, $strings);
        }

        return $strings;
    }
}


?>
