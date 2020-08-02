package com.leandrosve.nuntius.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.leandrosve.nuntius.model.User;

import org.springframework.data.jpa.domain.Specification;

public class UserSpecification implements Specification<User> {

    private static final long serialVersionUID = 1L;

    private User filter;

    public UserSpecification(User filter) {
        super();
        this.filter = filter;
    }

    public Predicate toPredicate(Root<User> root, CriteriaQuery<?> cq,
            CriteriaBuilder cb) {

        Predicate p = cb.disjunction();

        if (filter.getName() != null) {
            p.getExpressions()
                    .add(cb.like(root.get("name"), "%" + filter.getName() + "%"));
        }

        if (filter.getUsername() != null) {
            p.getExpressions().add(
                    cb.and(cb.like(root.get("username"), "%" + filter.getUsername() + "%" )));
        }

        return p;
    }
    
}