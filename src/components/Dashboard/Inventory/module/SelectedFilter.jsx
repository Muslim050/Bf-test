import {Button} from "@/components/ui/button.jsx";

const SelectedFilter = ({selectedChannel, selectedFormat, selectedChannelName, handleClear}) => {
  return (
    <div style={{display: 'flex'}}>
      <div className="flex gap-2 items-center">
        {(selectedChannel || selectedFormat) && (
          <Button
            variant="link"
            onClick={handleClear}
            className="text-[#A7CCFF] px-0"
          >
            Очистить
          </Button>
        )}
        {selectedFormat && (
          <div
            className="rounded-3xl	border border-solid border-[#D9D9D9] h-[40px] p-2 text-white text-sm	px-5	flex items-center justify-center">
            <div>{selectedFormat}</div>
          </div>
        )}
        {selectedChannelName && (
          <div
            className="rounded-3xl	border border-solid border-[#D9D9D9] h-[40px] p-2 text-white text-sm	px-5	flex items-center justify-center">
            <div>{selectedChannelName}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectedFilter