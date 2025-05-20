package net.airlineSystem.my_springApp.service;

import com.razorpay.*;

import java.util.UUID;

import org.json.*;
import org.springframework.stereotype.Service;


@Service
public class RozerPay {

    // private static final String KEY_ID = "rzp_test_A4auelGKapiY1w";
    // private static final String KEY_SECRET = "c8uztPaXbP3Mpi98g46tGzGW";
    private static final String KEY_ID = "rzp_test_bixwf8Ucq0MuaD";
    private static final String KEY_SECRET = "3keRPcHSepnWVRjGK9a0zkVR";

    public static Order createOrder(Integer amount) throws RazorpayException, JSONException {
        RazorpayClient razorpay = new RazorpayClient(KEY_ID, KEY_SECRET);
        	
        String orderId="Order_"+(UUID.randomUUID().toString().replace("-", ""));
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", orderId);
        
        // Adding notes to the order
        JSONObject notes = new JSONObject();

        Order order = razorpay.Orders.create(orderRequest);

        return order;
    }

//    public static void main(String[] args) {
//        try {
//            Order order = createOrder(1);
//            System.out.println("Order created: " + order.toString());
//        } catch (RazorpayException | JSONException e) {
//            System.err.println("Error creating order: " + e.getMessage());
//        }
//    }
}
