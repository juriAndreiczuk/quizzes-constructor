import Button from '@/app/components/ui/Button'
import { IPanelItem } from '@/types'

const PanelItem =  <T,>(
{ listLabel, listItems, listID, listSubitems, listItemSelect, listRemove }
: IPanelItem<T & { title: string }>
) => (
  <div className='text-14 mt-16 border-t-[1px] pt-16 border-t-addl'>
    <h5 className='text-20 font-bold mb-8 text-white'>{listLabel}</h5>
    {!listItems.length && (
      <Button
        btnMod='accent-small'
        buttonClick={() => { listID && listRemove(listID) }}
      >
        Delete
      </Button>
    )}
    { listSubitems && listSubitems.length && (
      <ul>
        {listItems && listItems.map(elt => (
          <li className='flex items-center mb-16' key={elt.title}>
            <span className='text-16 text-white mr-16'>{elt.title}</span>
            <Button
              btnMod='accent-small'
              buttonClick={() => listItemSelect(elt)}
            >
              Edit
            </Button>
          </li>
        ))}
      </ul>
    )}
  </div>
)

export default PanelItem