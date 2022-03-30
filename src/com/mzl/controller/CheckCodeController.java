package com.mzl.controller;

import com.mzl.utils.CheckCodeUtil;
import com.wf.captcha.GifCaptcha;
import com.wf.captcha.utils.CaptchaUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @ClassName :   CheckCodeController
 * @Description: 验证码处理控制器
 * @Author: 21989
 * @CreateDate: 2020/7/10 18:41
 * @Version: 1.0
 */
@Controller
public class CheckCodeController {

    //生成验证码
    @RequestMapping("/checkCode.action")
    public String checkCode(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("这个方法执行了...");

        GifCaptcha gifCaptcha = new GifCaptcha(130, 64, 4);
        String code = gifCaptcha.text();
        System.out.println(code);
        request.getSession().setAttribute("checkCode", code);  //存入session
        CaptchaUtil.out(gifCaptcha, request, response);  //显示到前端页面


//        // 告知浏览当作图片处理
//        response.setContentType("image/jpeg");
//
////        设置响应头信息，通知浏览器不要缓存
//        response.setHeader("Cache-Control", "no-cache");
//        response.setHeader("pragma", "no-cache");
//        response.setDateHeader("Expire", 0);
//
////        response.setHeader("Expires", "0");
////        response.setHeader("Cache-Control", "no-cache");
////        response.setHeader("Pragma", "no-cache");
//
//        System.out.println("lll");
//        CheckCodeUtil checkCodeUtil = new CheckCodeUtil();
//        try {
//            System.out.println("yyyy");
//            checkCodeUtil.getRanCode(request, response);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }

        return "";
    }

}
