'use client'

import Tabs from '@/app/components/ui/Tabs'
import { useTeamsCollectionStore } from '@/store/collections.store'
import useUsersStore from '@/store/users.store'
import PanelItem from '@/app/admin/panel/components/PanelItem'
import { ITeam, IUserDetails } from '@/types'

const TeamsList = () => {
  const { items, removeItem } = useTeamsCollectionStore()
  const { setSelectedUser, users } = useUsersStore()

  const getMembers = (team: ITeam): IUserDetails[] => (
    users.length ? users.filter(user => user.teamId === team.id) : [])

  return (
    <div>
      { items && items.length > 0 && (
        <>
          <h4 className='text-20 font-bold text-white mb-16'>Teams</h4>
          <Tabs tabsLabels={[...items.map(item => item.name)]}>
            { items.map(item => (
              <PanelItem<IUserDetails>
                key={item.id}
                listLabel={item.name}
                listItems={getMembers(item).map(elt => ({ ...elt, title: elt.displayName }))}
                listID={item.id}
                listSubitems={item.members}
                listItemSelect={setSelectedUser}
                listRemove={removeItem}
              />
            )) }
          </Tabs>
        </>
      ) }
    </div>
  )
}

export default TeamsList
