package com.leandrosve.nuntius.repository;

import com.leandrosve.nuntius.model.Message;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IMessageRepository extends JpaRepository<Message, Long>{
    
}