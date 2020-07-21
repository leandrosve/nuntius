package com.leandrosve.nuntius;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.leandrosve.nuntius.model.Chat;
import com.leandrosve.nuntius.model.Message;
import com.leandrosve.nuntius.model.User;
import com.leandrosve.nuntius.repository.IChatRepository;
import com.leandrosve.nuntius.repository.IMessageRepository;
import com.leandrosve.nuntius.repository.IUserRepository;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@SpringBootTest
class NuntiusAppTests {
	
	@Autowired
	IUserRepository userRepository;
	@Autowired
	IMessageRepository messageRepository;
	@Autowired 
	IChatRepository chatRepository;

	@Autowired
	BCryptPasswordEncoder encoder;
	@Test
	void saveUserTest() {
		User u= new User();
		u.setUsername("leandro2");
		u.setEmail("leandro2@gmail.com");
		u.setName("leandro2");
		u.setPassword(encoder.encode("123456"));
		User savedUser = userRepository.save(u);
		assertTrue(savedUser.getUsername().equals("leandro2"));
	}

	@BeforeEach
    void setUpTestDataWithinTransaction() {
		
		Chat chat = new Chat(null, null, false, null);
		chat.setId(420);
		List<Message> messages = new ArrayList<Message>();
		Message message = new Message(null, chat, "adasdasd");
		messages.add(message);
		chat.setMessages(messages);
		chatRepository.save(chat);
	}
	
	@Test
	void getMessagesTest() {
		List<Message> messages = messageRepository.findAllByChatIdAndSentTimeLessThan(420, new Date());
		assertTrue(messages.size() > 0);
	}

}
