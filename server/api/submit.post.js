import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_SUBMIT_API_KEY });

async function createGuest(value) {
    const response = await notion.pages.create({
        parent: {
            type: "data_source_id",
            data_source_id: process.env.NOTION_SUBMIT_DATA_SOURCE_ID
        },
        properties: {
            "名前": {
                title: [
                    {
                        text: {
                            content: value['entry.654003671'] + ' ' + value['entry.720946575'],
                        },
                    }
                ]
            },
            "ご出欠": {
                select: {
                    name: value['entry.707064267']
                }
            },
            "お名前（姓）": {
                rich_text: [
                    {
                        text: {
                            content: value['entry.654003671'],
                        },
                    }
                ]
            },
            "お名前（名）": {
                rich_text: [
                    {
                        text: {
                            content: value['entry.720946575'],
                        },
                    }
                ]
            },
            "お名前（姓：かな）": {
                rich_text: [
                    {
                        text: {
                            content: value['entry.1837378746'],
                        },
                    }
                ]
            },
            "お名前（名：かな）": {
                rich_text: [
                    {
                        text: {
                            content: value['entry.379307055'],
                        },
                    }
                ]
            },
            "ご連名1": {
                rich_text: [
                    {
                        text: {
                            content: value['entry.577033923'],
                        },
                    }
                ]
            },
            "ご連名1（ふりがな）": {
                rich_text: [
                    {
                        text: {
                            content: value['entry.1463568491'],
                        },
                    }
                ]
            },
            "ご連名2": {
                rich_text: [
                    {
                        text: {
                            content: value['entry.720175567'],
                        },
                    }
                ]
            },
            "ご連名2（ふりがな）": {
                rich_text: [
                    {
                        text: {
                            content: value['entry.1443811429'],
                        },
                    }
                ]
            },
            "ご連名3": {
                rich_text: [
                    {
                        text: {
                            content: value['entry.924191309'],
                        },
                    }
                ]
            },
            "ご連名3（ふりがな）": {
                rich_text: [
                    {
                        text: {
                            content: value['entry.176464161'],
                        },
                    }
                ]
            },
            "ご連名4": {
                rich_text: [
                    {
                        text: {
                            content: value['entry.829516189'],
                        },
                    }
                ]
            },
            "ご連名4（ふりがな）": {
                rich_text: [
                    {
                        text: {
                            content: value['entry.1903233454'],
                        },
                    }
                ]
            },
            "いずれかをお選びください": {
                select: {
                    name: value['entry.1446298437']
                }
            },
            "メールアドレス": {
                email: value['entry.280336886'] !== '' ? value['entry.280336886'] : null,
            },
            "ご住所（郵便番号）":{
                number: Number(value['entry.1473960836'])
            },
            "ご住所（都道府県）": {
                rich_text: [
                    {
                        text: {
                            content: value['entry.338786'],
                        },
                    }
                ]
            },
            "ご住所（市区町村・番地）": {
                rich_text: [
                    {
                        text: {
                            content: value['entry.778005714'],
                        },
                    }
                ]
            },
            "ご住所（マンション・建物名）": {
                rich_text: [
                    {
                        text: {
                            content: value['entry.331640168'],
                        },
                    }
                ]
            },
            "アレルギーについて": {
                rich_text: [
                    {
                        text: {
                            content: value['entry.1584758284'],
                        },
                    }
                ]
            },
            "新郎新婦へのメッセージ": {
                rich_text: [
                    {
                        text: {
                            content: value['entry.892809074'],
                        },
                    }
                ]
            },
        },
    });
    return response;
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    console.log(body);

    createGuest(body).then((res) => {
        console.log(res);
        setResponseStatus(event, res.status);
    })
    .catch((error) => {
        console.log(error);
        setResponseStatus(event, 500);
    });
});