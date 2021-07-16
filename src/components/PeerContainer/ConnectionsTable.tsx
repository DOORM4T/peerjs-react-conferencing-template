import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import Peer from "peerjs"
import React from "react"

export interface IMyPeerData {
  peerObj: Peer
  name?: string
}

export interface IConnectedPeer {
  connection: Peer.DataConnection
  name?: string
}

const ConnectionsTable = (props: {
  myPeerData: IMyPeerData
  peers: IConnectedPeer[]
}) => {
  const { myPeerData, peers } = props

  return (
    <Table
      size="md"
      variant="striped"
      color="black"
      colorScheme="teal"
      bg="white"
      rounded="md"
    >
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>Data</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>{myPeerData.peerObj.id}</Td>
          <Td>{myPeerData.name || "-"}</Td>
          <Td>"Doot doot"</Td>
        </Tr>
        {peers.map((p) => (
          <Tr key={p.connection.peer}>
            <Td>{p.connection.peer}</Td>
            <Td>{p.name || "-"}</Td>
            <Td>"Beep boop"</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
export default ConnectionsTable
