package com.example.onlinebookingsystem;

import com.example.onlinebookingsystem.repository.AccountRepositoryTest;
import com.example.onlinebookingsystem.repository.BookingRepositoryTest;
import com.example.onlinebookingsystem.repository.ReviewRepositoryTest;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
		AccountRepositoryTest.class,
		BookingRepositoryTest.class,
		ReviewRepositoryTest.class
})
public class OnlineBookingSystemApplicationTests {
	@Test
	public void contextLoads() {}
}
