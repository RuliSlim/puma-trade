import { TItleTableModel } from "./history";
import { Member } from "./tree_data";

export const dummyData: Array<Member> = [
	{
		name: "1",
		ref: "0"
	},
	// {
	// 	name: "2",
	// 	ref: "1"
	// },
	{
		name: "4",
		ref: "2"
	},
	{
		name: "5",
		ref: "2"
	},

];

export const dummyDeposit: Array<TItleTableModel> = [
	{
		id: 1,
		date: "2020-08-01",
		nominal: 200,
		total: 200.2,
		type: "ETH"
	},
	{
		id: 2,
		date: "2020-08-01",
		nominal: 300,
		total: 300.5,
		type: "DOGE"
	},
	{
		id: 3,
		date: "2020-08-01",
		nominal: 200,
		total: 200.6,
		type: "BTC"
	},
	{
		id: 4,
		date: "2020-08-01",
		nominal: 200,
		total: 200.2,
		type: "ETH"
	},
	{
		id: 5,
		date: "2020-08-01",
		nominal: 200,
		total: 200.2,
		type: "ETH"
	},
	{
		id: 6,
		date: "2020-08-01",
		nominal: 200,
		total: 200.2,
		type: "ETH"
	},
	{
		id: 7,
		date: "2020-08-01",
		nominal: 200,
		total: 200.2,
		type: "ETH"
	},
	{
		id: 8,
		date: "2020-08-01",
		nominal: 200,
		total: 200.2,
		type: "ETH"
	},
	{
		id: 9,
		date: "2020-08-01",
		nominal: 200,
		total: 200.2,
		type: "ETH"
	},
	{
		id: 10,
		date: "2020-08-01",
		nominal: 200,
		total: 200.2,
		type: "ETH"
	},
	{
		id: 11,
		date: "2020-08-01",
		nominal: 200,
		total: 200.2,
		type: "ETH"
	},
	{
		id: 12,
		date: "2020-08-01",
		nominal: 200,
		total: 200.2,
		type: "ETH"
	},
];

export const dummySponsor = [
	{
		id: 1,
		date: "2020-08-01",
		nominal: 200,
		type: "Sponsor"
	},
	{
		id: 2,
		date: "2020-08-01",
		nominal: 300,
		type: "Sponsor"
	},
	{
		id: 3,
		date: "2020-08-01",
		nominal: 200,
		type: "Sponsor"
	},
	{
		id: 4,
		date: "2020-08-01",
		nominal: 200,
		type: "Sponsor"
	},
	{
		id: 5,
		date: "2020-08-01",
		nominal: 200,
		type: "Sponsor"
	},
	{
		id: 6,
		date: "2020-08-01",
		nominal: 200,
		type: "Sponsor"
	},
	{
		id: 7,
		date: "2020-08-01",
		nominal: 200,
		type: "Sponsor"
	},
	{
		id: 8,
		date: "2020-08-01",
		nominal: 200,
		type: "Sponsor"
	},
	{
		id: 9,
		date: "2020-08-01",
		nominal: 200,
		type: "Sponsor"
	},
	{
		id: 10,
		date: "2020-08-01",
		nominal: 200,
		type: "Sponsor"
	},
	{
		id: 11,
		date: "2020-08-01",
		nominal: 200,
		type: "Sponsor"
	},
	{
		id: 12,
		date: "2020-08-01",
		nominal: 200,
		type: "Sponsor"
	},
];

export const dummyPairing = [
	{
		id: 1,
		date: "2020-08-01",
		nominal: 200,
		type: "Pairing"
	},
	{
		id: 2,
		date: "2020-08-01",
		nominal: 300,
		type: "Pairing"
	},
	{
		id: 3,
		date: "2020-08-01",
		nominal: 200,
		type: "Pairing"
	},
	{
		id: 4,
		date: "2020-08-01",
		nominal: 200,
		type: "Pairing"
	},
	{
		id: 5,
		date: "2020-08-01",
		nominal: 200,
		type: "Pairing"
	},
	{
		id: 6,
		date: "2020-08-01",
		nominal: 200,
		type: "Pairing"
	},
	{
		id: 7,
		date: "2020-08-01",
		nominal: 200,
		type: "Pairing"
	},
	{
		id: 8,
		date: "2020-08-01",
		nominal: 200,
		type: "Pairing"
	},
	{
		id: 9,
		date: "2020-08-01",
		nominal: 200,
		type: "Pairing"
	},
	{
		id: 10,
		date: "2020-08-01",
		nominal: 200,
		type: "Pairing"
	},
	{
		id: 11,
		date: "2020-08-01",
		nominal: 200,
		type: "Pairing"
	},
	{
		id: 12,
		date: "2020-08-01",
		nominal: 200,
		type: "Pairing"
	},
];

export const dummyUser = {
	id: 1,
	username: "Username",
	email: "email@email.gmail.com",
	avatar: "option we provide later",
	isActive: false,
	phone: null,
	name: null,
	token: 50,
	point: 50,
	capping: 300,
	total_purchased: 1000
};

/*
Sponsor
tanggal, type, nominal hasil
date, sponsor, $214214

Pairing
tanggal, type, nominal hasil
date, pairing, $1234

*/

/*
[ETH] => POP UP (masukin nominal) => diarahin coin paymen
[DOGE] => POP UP (masukin nominal) => diarahin coin paymen
[BTC] => POP UP (masukin nominal) => diarahin coin paymen
*/

/*
PROFIL
avatar (options kita sediakan)
email, no phone editable
*/

/*
BONUS AKTIF DAN PASIF DIGABUNG
POP UP CONVERT
masukan nominal
token 30%, poin 70%
*/

/*
PURCHASE
tampilan saldo user
isi nominal
isi password user
tos
button
*/

/*
WITDRAW
tipe jenis (wd admin atau wd p2p member)

wd admin:
menampilkan saldo token
isi nominal (minimum 10% purchase, ambil dari token!, max capping kalau sudah melebihi capping repurchase)
hasil yang diterima
password
tos
button

p2p member:
menampilkan saldo token dan poin
isi username tujuan
nominal
password
tos
button
*/
