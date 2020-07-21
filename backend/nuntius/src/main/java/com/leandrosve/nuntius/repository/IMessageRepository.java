package com.leandrosve.nuntius.repository;

import java.util.Date;
import java.util.List;

import com.leandrosve.nuntius.model.Message;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IMessageRepository extends JpaRepository<Message, Long>{

    List<Message> findAllByChatIdAndSentTimeLessThan(long chatId, Date sentTime);
    
}