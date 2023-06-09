<?php
if( !empty($_POST) ) {
        $subject = 'Subscribe newsletter';

        $message = "E-mail: " . $_POST['usermail'] ;

        $sendMail = mail( $_POST['usermail'], "New mail", $message );
        if( $sendMail ) {
            echo "The letter was successfully sent!";
			echo "<br /><br /><a href='/'>Return.</a>";
        } else {
            echo "Oops ... something seems to have gone wrong!";
        }
    }
?>
<script language="JavaScript" type="text/javascript">
function changeurl(){eval(self.location="/");}
window.setTimeout("changeurl();",3000);
</script>