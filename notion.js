const { Client } = require('@notionhq/client')
const notion = new Client({ auth: process.env.NOTION_API_KEY });

exports.append = function(foodName)
{
  const blockId = process.env.SHOPPINGLIST_BLOCK_ID;
  const response = notion.blocks.children.append({
    block_id: blockId,
    children: [
      {
        object: 'block',
        type: 'to_do',
        to_do: {
          text: [
            {
              type: 'text',
              text: {
                content: foodName
              },
            },
          ],
        },
      },
    ],
  });
  console.log(response);
  return 0;
};

exports.getCheckboxItems = async function()
{
  const blockId = process.env.SHOPPINGLIST_PAGE_ID;
  const pageContents = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });
  let checkboxItems = [];
  for (const i in pageContents.results) {
    const item = pageContents.results[i];
    if (item.type === 'to_do') {
      checkboxItems.push({id: item.id, name: item.to_do.text[0].plain_text})
    };
  };
  return checkboxItems;
};

exports.uncheck = function(id)
{
  const blockId = id;
  const response = notion.blocks.update({
    block_id: blockId,
    to_do: {
      checked: false,
    }
  });
  console.log(response);
  return 0;
}