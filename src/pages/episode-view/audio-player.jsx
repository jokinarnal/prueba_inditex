export const AudioPlayer = ({url}) => 
  (<audio className="audio-player" controls={true}>
    <source src={url} type="audio/mpeg"></source>
  </audio>);