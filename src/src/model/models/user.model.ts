export interface User {
	token?: string;
	city: string;
	name: string;
	email: string;
	phone: string;
	created: string;
	referal_code: string;
	role: string;
	sponsor_by: string;
	upline: string;
	status: string;
	position: string;
	referal_by: string;
	created_at: string;
}

export interface UserData {
	city: string;
	name: string;
	email: string;
	phone: string;
	created: string;
	referal_code: string;
	role: string;
	sponsor_by: string;
	upline: string;
	status: string;
	position: string;
	referal_by: string;
	created_at: string;
}

export interface LoginModel {
	username: string;
	password: string;
}

export interface RegisterModel {
	username: string;
	email: string;
	password: string;
	referal_code: string;
}

// city: "bekasi"
// created_at: "2020-11-10"
// email: "nabaman@gmail.com"
// name: "nabun albi"
// position: "0"
// referal_code: "BC8BVY"
// role: "user"
// sponsor_by: "nabz"
// status: "aktif"
// token: "c6aa02514d217ab1d5b7fe63ba3e781e78518a17"
// upline: "nabz"