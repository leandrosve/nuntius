package com.leandrosve.nuntius;

import static org.junit.jupiter.api.Assertions.assertTrue;

import com.leandrosve.nuntius.model.User;
import com.leandrosve.nuntius.repository.IUserRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@SpringBootTest
class NuntiusAppTests {
	
	@Autowired
	IUserRepository users;

	@Autowired
	BCryptPasswordEncoder encoder;
	@Test
	void saveUserTest() {
		User u= new User();
		u.setUsername("leandro2");
		u.setEmail("leandro2@gmail.com");
		u.setName("leandro2");
		u.setPassword(encoder.encode("123456"));
		User savedUser = users.save(u);
		assertTrue(savedUser.getUsername().equals("leandro2"));
	}

}
