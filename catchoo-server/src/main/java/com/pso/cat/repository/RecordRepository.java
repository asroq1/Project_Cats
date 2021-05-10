package com.pso.cat.repository;

import com.pso.cat.entity.Record;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {
    List<Record> findAllByCatIdOrderByCreateDateDesc(Long catId);
    Record findFirstByCatIdAndStateOrderByCreateDateDesc(Long catId, int state);
}
