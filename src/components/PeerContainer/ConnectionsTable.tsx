import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import React from "react"
import { IMyPeer, IPeerConnection, IPeerData } from "./types"

const ConnectionsTable = (props: {
  myPeer: IPeerData & IMyPeer
  peers: (IPeerData & IPeerConnection)[]
}) => {
  const { myPeer, peers } = props

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
          <Td>{myPeer.peerObj.id}</Td>
          <Td>{myPeer.name || "-"}</Td>
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
