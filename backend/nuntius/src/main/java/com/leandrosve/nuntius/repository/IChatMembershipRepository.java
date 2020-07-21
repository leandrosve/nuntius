package com.leandrosve.nuntius.repository;

import com.leandrosve.nuntius.model.ChatMembership;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IChatMembershipRepository extends JpaRepository<ChatMembership, Long>{

    
}