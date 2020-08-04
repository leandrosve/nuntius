package com.leandrosve.nuntius.repository;

import com.leandrosve.nuntius.model.Chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IChatRepository extends JpaRepository<Chat, Long>{

    
}