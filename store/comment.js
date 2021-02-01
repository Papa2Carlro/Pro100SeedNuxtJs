/* eslint-disable */
export const state = () => ({
  comments: [
    {
      id: 0,
      rate: 1,
      author: {
        name: 'John appleseed',
        avatar: '/image/story/avatar.jpg',
      },
      body: `
          <p>
            We and we Max live in the second millennium. It offers new amazing opportunities and challenges: you can grow your own
            crop using seeds from Netherlands. There is a club of devoted growers.
          </p>

          <p>
            We live in the second millennium. It offers new amazing opportunities and challenges: you can grow your own
            crop using seeds from Netherlands. There is a club of devoted growers.
          </p>

          <p>
            We live in the second millennium. It offers new amazing opportunities and challenges: you can grow your own
            crop using seeds from Netherlands. There is a club of devoted growers.
          </p>

          <p>
            We live in the second millennium. It offers new amazing opportunities and challenges: you can grow your own
            crop using seeds from Netherlands. There is a club of devoted growers.
          </p>
      `
    },
    {
      id: 1,
      rate: 2,
      author: {
        name: 'Max Priymak',
        avatar: '/image/story/avatar.jpg',
      },
      body: `
          <p>
            Me We live in the second millennium. It offers new amazing opportunities and challenges: you can grow your own
            crop using seeds from Netherlands. There is a club of devoted growers.
          </p>

          <p>
            We live in the second millennium. It offers new amazing opportunities and challenges: you can grow your own
            crop using seeds from Netherlands. There is a club of devoted growers.
          </p>

          <p>
            We live in the second millennium. It offers new amazing opportunities and challenges: you can grow your own
            crop using seeds from Netherlands. There is a club of devoted growers.
          </p>

          <p>
            We live in the second millennium. It offers new amazing opportunities and challenges: you can grow your own
            crop using seeds from Netherlands. There is a club of devoted growers.
          </p>
      `
    },
    {
      id: 2,
      rate: 4,
      author: {
        name: 'Max Azimov',
        avatar: '/image/story/avatar.jpg',
      },
      body: `
          <p>
            Me We live in the second millennium. It offers new amazing opportunities and challenges: you can grow your own
            crop using seeds from Netherlands. There is a club of devoted growers.
          </p>

          <p>
            We live in the second millennium. It offers new amazing opportunities and challenges: you can grow your own
            crop using seeds from Netherlands. There is a club of devoted growers.
          </p>

          <p>
            We live in the second millennium. It offers new amazing opportunities and challenges: you can grow your own
            crop using seeds from Netherlands. There is a club of devoted growers.
          </p>

          <p>
            We live in the second millennium. It offers new amazing opportunities and challenges: you can grow your own
            crop using seeds from Netherlands. There is a club of devoted growers.
          </p>
      `
    },
  ]
})

export const mutations = {}

export const actions = {}

export const getters = {
  getComments (state) {
    return state.comments
  }
}
