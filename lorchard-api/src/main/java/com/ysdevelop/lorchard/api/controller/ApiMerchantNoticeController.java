package com.ysdevelop.lorchard.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ysdevelop.lorchard.api.entity.MerchantNoticeVo;
import com.ysdevelop.lorchard.api.service.ApiMerchantNoticeService;
import com.ysdevelop.lorchard.common.result.Result;

/**
 * 
 * 
 * @author 徐一鸣 
 *
 * @Date 2018年9月10日 上午10:15:24 
 *
 * @Package com.ysdevelop.lorchard.api.controller
 *
 * @Description: TODO
 *
 * @version V1.0
 *
 */
@RestController
@RequestMapping(value = "/merchantNotice")
public class ApiMerchantNoticeController {
	
	@Autowired
	private ApiMerchantNoticeService apiMerchantNoticeService;
	
	@RequestMapping(value="",method = RequestMethod.GET)
	public Result<List<MerchantNoticeVo>> getNotice(Long merchantId){
		List<MerchantNoticeVo> apiMerchantNotice = apiMerchantNoticeService.list(merchantId);
		return Result.successData(apiMerchantNotice);
	}
}