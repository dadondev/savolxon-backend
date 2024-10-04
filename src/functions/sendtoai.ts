/** @format */

import { modelGemini } from "..";

async function sendToChatGPT(text: string) {
	const prompt = `Fayldan kelayotgan ma'lumotni to'g'rilang va tayyorlang:

Men sizga tests faylidan ma'lumot yuboraman.
Ushbu ma'lumotlarni quyidagi interfeyslar bo'yicha moslashtiring:
Ma'lumotlarda interfeysda kerak bo'lmagan ma'lumotlar bo'lsa, ularni o'chirib tashlang.
Agar savolga rasm yoki diagramma yordamida javob berilgan bo'lsa, ushbu savolni interfeyslarga qo'shmang.
Agar ma'lumotlar to‘liq bo‘lmasa, interfeysga to‘g‘ri joylab, kerakli bo‘limlarni to‘ldiring.
Juda muhim: Barcha ma'lumotlarni 5 marta tekshiring va natijani agar iloji bo'lsa JSON formatida qaytaring.
Interfeyslar:

interface RespI {
    quizs: SingleQuiz[]; // Testlarning ro'yxati
}

interface SingleVariant {
  text: string; // Savolning varianti
  name: string; // Variant nomi (A, B, C, D)
}

interface SingleQuiz {
  text: string; // Savol matni
  variants: SingleVariant[]; // Savol variantlari ro'yxati
  true_variant: string; // To'g'ri javob
}

Malumotlar: ${text}
`;
	console.log(text);
	const resp = await modelGemini.generateContent([prompt]);
	const letters = resp.response.text().split("");
	const filterLetters = letters.filter((e, i) => {
		if (i > 6 && letters.length - 4 > i) return true;
		return false;
	});
	const promptCheck = `Sen bu malumotlarni tekshir va chalalarini to'ldirib va yana bir bor tekshirib qaytar savoldagi javoblarni olib tashla
	 malumotlar=${resp.response.text()}
	  `;

	const responeCheck = await await modelGemini.generateContent([promptCheck]);
	console.log(responeCheck.response.text());

	const datas = JSON.parse(filterLetters.join(""));

	return datas;
}

export default sendToChatGPT;
