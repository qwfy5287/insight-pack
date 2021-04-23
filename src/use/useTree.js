// import { reactive } from '@vue/composition-api'

import { onMounted, reactive, toRefs } from '@vue/composition-api'

export const useTree = (callbackApi) => {
  const state = reactive({
    treeData: [],
    defaultProps: {
      children: 'childrens',
      label: 'classifyName',
    },
  })

  const fetchData = async () => {
    const res = await callbackApi()
    if (!res) return false

    state.treeData = res.data
    state.treeData1 = [
      {
        id: 1,
        label: '一级 1',
        children: [
          {
            id: 4,
            label: '二级 1-1',
            children: [
              {
                id: 9,
                label: '三级 1-1-1',
              },
              {
                id: 10,
                label: '三级 1-1-2',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: '一级 2',
        children: [
          {
            id: 5,
            label: '二级 2-1',
          },
          {
            id: 6,
            label: '二级 2-2',
          },
        ],
      },
      {
        id: 3,
        label: '一级 3',
        children: [
          {
            id: 7,
            label: '二级 3-1',
          },
          {
            id: 8,
            label: '二级 3-2',
          },
        ],
      },
    ]
    console.log(
      '🚀 ~ file: MetaDataMain.vue ~ line 58 ~ fetchData ~ state.treeData',
      state.treeData
    )

    // console.log('🚀 ~ file: MetaDataMain.vue ~ line 54 ~ fetchData ~ res', res)
  }

  onMounted(() => {
    fetchData()
  })

  return {
    ...toRefs(state),
  }
}
