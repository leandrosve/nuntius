package com.leandrosve.nuntius.repository;

import java.util.List;

import com.leandrosve.nuntius.model.Chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface IChatRepository extends JpaRepository<Chat, Long>{
    @Query( "select cm.chat from ChatMembership cm group by cm.chat having cm.chat.groupal = false and COUNT(cm.user)=2 AND COUNT(DISTINCT case when cm.user.id IN ( :oneUserId, :otherUserId ) then cm.user.id end)=2" )
    List<Chat> findPrivateChat(@Param("oneUserId") long oneUserId, @Param("otherUserId") long otherUserId);
    
    
    //@Query(value= "select c from Chat c where c.groupal = false and EXISTS ( select cm.chat_id from ChatMembership cm  group by cm.chat_id having COUNT(cm.user_id)=2 AND COUNT(DISTINCT case when cm.user_id IN ( 1, 4 ) then cm.user_id end)=2)" )
    
}