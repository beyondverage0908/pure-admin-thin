import { Tree } from "./index";
/**
 * 数据源
 */
export const dataSource: Tree[] = [
  {
    id: 1,
    code: "level-one-1",
    label: "Level one 1",
    children: [
      {
        id: 4,
        code: "level-two-1-1",
        label: "Level two 1-1",
        parentId: 1,
        children: [
          {
            id: 9,
            code: "level-three 1-1-1",
            label: "Level three 1-1-1",
            parentId: 4
          },
          {
            id: 10,
            code: "level-three-1-1-2",
            label: "Level three 1-1-2",
            parentId: 4,
            children: [
              {
                id: 11,
                label: "Level Four 1-1-1-1",
                code: "level-four-1-1-1-1",
                parentId: 10
              },
              { id: 12, label: "Level Four 1-1-1-2", parentId: 10 },
              { id: 13, label: "Level Four 1-1-1-4", parentId: 10 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: "Level one 2",
    children: [
      {
        id: 5,
        label: "Level two 2-1",
        parentId: 2
      },
      {
        id: 6,
        label: "Level two 2-2",
        parentId: 2
      }
    ]
  },
  {
    id: 3,
    label: "Level one 3",
    children: [
      {
        id: 7,
        label: "Level two 3-1",
        parentId: 3
      },
      {
        id: 8,
        label: "Level two 3-2",
        parentId: 3
      }
    ]
  }
];
