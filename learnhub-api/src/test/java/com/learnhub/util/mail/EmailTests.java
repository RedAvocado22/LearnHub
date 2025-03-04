package com.learnhub.util.mail;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EmailTests {
    //@Autowired
    //private EmailService emailService;
    //
    //@Autowired
    //private DirectChannel imapIdleChannel;
    //
    //@Autowired
    //private ImapMailReceiver imapMailReceiver;

    @Test
    public void testImapInbound() throws Exception {
		//imapIdleChannel.subscribe(message -> {
		//          assertThat(message).isNotNull();
		//          MessageHeaders headers = message.getHeaders();
		//          assertThat(headers.get(MailHeaders.TO, String[].class)).containsExactly("Bảo Doãn Quốc <doanquocbaooooooo@gmail.com>");
		//          assertThat(headers.get(MailHeaders.FROM)).isEqualTo("learnhub391@gmail.com <learnhub391@gmail.com>");
		//          assertThat(headers.get(MailHeaders.SUBJECT)).isEqualTo("Test Email");
		//          assertThat(message.getPayload()).isEqualTo("Hello My name is Bao, this is a test email message.\r\n");
		//      });
        //Message[] messages = (Message[])imapMailReceiver.receive();
        //assertThat(messages).isNotEmpty();
        //assertThat(messages[0].getSubject()).isEqualTo("Test Mail");
        //assertThat(messages[0].getContent().toString()).isEqualTo("This is a test email from DQB.\r\n");
    }
}
