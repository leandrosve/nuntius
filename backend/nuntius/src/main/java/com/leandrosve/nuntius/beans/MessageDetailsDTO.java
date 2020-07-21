package com.leandrosve.nuntius.beans;

import java.util.List;

public class MessageDetailsDTO {
    private List<MessageReceptionDTO> receptions;
        private boolean received = false;
        private boolean seen = false;
        public MessageDetailsDTO() {super();}
        public MessageDetailsDTO(List<MessageReceptionDTO> receptions, boolean received, boolean seen) {
            this.receptions = receptions;
            this.received = received;
            this.seen = seen;
        }
        public List<MessageReceptionDTO> getReceptions() {return receptions;}
        public void setReceptions(List<MessageReceptionDTO> receptions) {this.receptions = receptions;}
        public boolean isReceived() {return received;}
        public void setReceived(boolean received) {this.received = received;}
        public boolean isSeen() {return seen;}
        public void setSeen(boolean seen) {this.seen = seen;}   
}