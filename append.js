const { Client } = require('@notionhq/client')
// import pkg from '@notionhq/client';
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
