import { DefaultExtractors, VimeoExtractor } from "@discord-player/extractor";
import { Player, useMainPlayer } from "discord-player";

import ExtendedClient from "../ExtendedClient";

class MusicPlayer extends Player {
  public readonly player: Player;

  constructor(public readonly eClient: ExtendedClient) {
    super(eClient, {
      blockExtractors: [VimeoExtractor.identifier],
    });

    this.extractors.loadMulti(DefaultExtractors);

    this.player = useMainPlayer();
  }
}

export default MusicPlayer;
