import styled from "@emotion/styled"

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

export const FlexRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  @media(max-width:450px) {
    gap: 10px;
  }
  // gap: 20px;
`